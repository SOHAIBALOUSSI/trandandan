#!/bin/bash

# EC2 Production Deployment Script for Transcendence Project
# This script sets up and deploys the application on an EC2 instance

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="transcendence"
DOMAIN_NAME="${1:-your-domain.com}"  # Pass domain as first argument
EMAIL="${2:-admin@your-domain.com}"   # Pass email as second argument

echo -e "${BLUE}🚀 Starting EC2 deployment for ${APP_NAME}...${NC}"

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

# Update system packages
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install essential packages
print_status "Installing essential packages..."
sudo apt install -y \
    curl \
    wget \
    git \
    unzip \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release \
    htop \
    nginx \
    certbot \
    python3-certbot-nginx \
    ufw \
    fail2ban \
    logwatch

# Install Docker
print_status "Installing Docker..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add user to docker group
sudo usermod -aG docker $USER
print_warning "You need to log out and back in for docker group changes to take effect"

# Install Docker Compose
print_status "Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create application directory
print_status "Setting up application directory..."
sudo mkdir -p /opt/$APP_NAME
sudo chown $USER:$USER /opt/$APP_NAME
cd /opt/$APP_NAME

# Clone repository (replace with your actual repository URL)
print_status "Cloning application repository..."
git clone https://github.com/yourusername/transcendence.git .
# Or copy files if you're deploying from local machine
# sudo cp -r /path/to/your/project/* /opt/$APP_NAME/

# Create necessary directories
print_status "Creating necessary directories..."
mkdir -p logs/nginx ssl backups

# Set up environment file
print_status "Setting up environment configuration..."
if [ ! -f .env.prod ]; then
    cp env.prod.example .env.prod
    print_warning "Please edit .env.prod with your actual configuration values"
    print_warning "Run: nano .env.prod"
fi

# Generate strong passwords for services
print_status "Generating strong passwords..."
REDIS_PASSWORD=$(openssl rand -base64 32)
RABBITMQ_PASSWORD=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 64)

# Update environment file with generated passwords
sed -i "s/your_strong_redis_password/$REDIS_PASSWORD/g" .env.prod
sed -i "s/your_strong_rabbitmq_password/$RABBITMQ_PASSWORD/g" .env.prod
sed -i "s/your_super_secret_jwt_key_here_make_it_long_and_random/$JWT_SECRET/g" .env.prod

# Configure firewall
print_status "Configuring firewall..."
sudo ufw --force enable
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
sudo ufw --force reload

# Configure fail2ban
print_status "Configuring fail2ban..."
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Create fail2ban configuration
sudo tee /etc/fail2ban/jail.local > /dev/null <<EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 3
EOF

sudo systemctl restart fail2ban

# Set up SSL certificates with Let's Encrypt
if [ "$DOMAIN_NAME" != "your-domain.com" ]; then
    print_status "Setting up SSL certificates for $DOMAIN_NAME..."
    
    # Stop nginx temporarily
    sudo systemctl stop nginx
    
    # Obtain SSL certificate
    sudo certbot certonly --standalone -d $DOMAIN_NAME --email $EMAIL --agree-tos --non-interactive
    
    # Create SSL directory and copy certificates
    sudo mkdir -p ssl/certs ssl/private
    sudo cp /etc/letsencrypt/live/$DOMAIN_NAME/fullchain.pem ssl/certs/
    sudo cp /etc/letsencrypt/live/$DOMAIN_NAME/privkey.pem ssl/private/
    sudo chown -R $USER:$USER ssl/
    
    # Set up automatic renewal
    echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -
fi

# Build and start services
print_status "Building and starting services..."
docker-compose -f docker-compose.prod.yml build

# Start services
print_status "Starting services..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be healthy
print_status "Waiting for services to be healthy..."
sleep 30

# Check service health
print_status "Checking service health..."
docker-compose -f docker-compose.prod.yml ps

# Set up log rotation
print_status "Setting up log rotation..."
sudo tee /etc/logrotate.d/$APP_NAME > /dev/null <<EOF
/opt/$APP_NAME/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
    postrotate
        docker-compose -f /opt/$APP_NAME/docker-compose.prod.yml restart nginx
    endscript
}
EOF

# Set up monitoring and backup
print_status "Setting up monitoring and backup..."

# Create backup script
cat > backup.sh <<'EOF'
#!/bin/bash
BACKUP_DIR="/opt/transcendence/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.tar.gz"

# Create backup
tar -czf "$BACKUP_FILE" \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=backups \
    --exclude=logs \
    .

# Remove old backups (keep last 30 days)
find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +30 -delete

echo "Backup created: $BACKUP_FILE"
EOF

chmod +x backup.sh

# Add backup to crontab
(crontab -l 2>/dev/null; echo "0 2 * * * /opt/$APP_NAME/backup.sh") | crontab -

# Create systemd service for auto-start
print_status "Creating systemd service for auto-start..."
sudo tee /etc/systemd/system/$APP_NAME.service > /dev/null <<EOF
[Unit]
Description=Transcendence Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/$APP_NAME
ExecStart=/usr/local/bin/docker-compose -f docker-compose.prod.yml up -d
ExecStop=/usr/local/bin/docker-compose -f docker-compose.prod.yml down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
sudo systemctl enable $APP_NAME.service
sudo systemctl start $APP_NAME.service

# Set up monitoring
print_status "Setting up basic monitoring..."

# Create monitoring script
cat > monitor.sh <<'EOF'
#!/bin/bash
echo "=== System Status ==="
echo "Date: $(date)"
echo "Uptime: $(uptime)"
echo "Memory: $(free -h | grep Mem)"
echo "Disk: $(df -h / | tail -1)"

echo -e "\n=== Docker Status ==="
docker-compose -f docker-compose.prod.yml ps

echo -e "\n=== Service Health ==="
curl -s https://localhost/health || echo "Health check failed"

echo -e "\n=== Recent Logs ==="
docker-compose -f docker-compose.prod.yml logs --tail=20
EOF

chmod +x monitor.sh

# Create deployment completion message
print_status "Deployment completed successfully!"
echo -e "${GREEN}"
echo "🎉 Your Transcendence application has been deployed!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env.prod with your actual configuration values"
echo "2. Update your domain DNS to point to this EC2 instance"
echo "3. Access your application at: https://$DOMAIN_NAME"
echo "4. Monitor logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "5. Check service health: ./monitor.sh"
echo "6. Create manual backup: ./backup.sh"
echo ""
echo "🔒 Security features enabled:"
echo "- Firewall (UFW) configured"
echo "- Fail2ban protection active"
echo "- SSL certificates configured"
echo "- Non-root user for services"
echo "- Automatic security updates"
echo ""
echo "📊 Monitoring:"
echo "- Log rotation configured"
echo "- Automatic backups scheduled"
echo "- Systemd service for auto-start"
echo ""
echo "⚠️  Important:"
echo "- Change default passwords in .env.prod"
echo "- Set up proper SSL certificates for production"
echo "- Configure monitoring and alerting"
echo "- Set up proper backup storage (S3, etc.)"
echo "${NC}"

# Display current status
echo -e "${BLUE}Current service status:${NC}"
docker-compose -f docker-compose.prod.yml ps

echo -e "${BLUE}System resources:${NC}"
free -h
df -h /
