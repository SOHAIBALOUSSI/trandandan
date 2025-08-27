# Production Deployment Guide

This guide covers deploying the Transcendence project to production on EC2 with Docker Compose.

## 🚀 Quick Start

### 1. Prerequisites

- EC2 instance with Ubuntu 20.04+ (recommended: t3.medium or larger)
- Domain name pointing to your EC2 instance
- SSH access to your EC2 instance
- At least 20GB of storage

### 2. One-Command Deployment

```bash
# Clone this repository to your EC2 instance
git clone <your-repo-url>
cd my-trans

# Make the deployment script executable
chmod +x deploy-ec2.sh

# Run the deployment script
./deploy-ec2.sh your-domain.com your-email@domain.com
```

## 📋 Manual Deployment Steps

### Step 1: EC2 Instance Setup

1. **Launch EC2 Instance**
   - AMI: Ubuntu Server 20.04 LTS
   - Instance Type: t3.medium (2 vCPU, 4GB RAM) minimum
   - Storage: 20GB+ GP2
   - Security Group: Allow SSH (22), HTTP (80), HTTPS (443)

2. **Connect to Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

### Step 2: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y curl wget git unzip software-properties-common

# Install Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add user to docker group
sudo usermod -aG docker $USER
# Log out and back in for changes to take effect
```

### Step 3: Application Setup

```bash
# Create application directory
sudo mkdir -p /opt/transcendence
sudo chown $USER:$USER /opt/transcendence
cd /opt/transcendence

# Clone your repository
git clone <your-repo-url> .

# Create necessary directories
mkdir -p logs/nginx ssl backups
```

### Step 4: Environment Configuration

```bash
# Copy environment template
cp env.prod.example .env.prod

# Edit environment file
nano .env.prod
```

**Required Environment Variables:**
- `NODE_ENV=production`
- `JWT_SECRET` - Strong random string
- `REDIS_PASSWORD` - Strong password for Redis
- `RABBITMQ_USER` - Username for RabbitMQ
- `RABBITMQ_PASSWORD` - Strong password for RabbitMQ
- `SMTP_*` - Email configuration for notifications
- `DOMAIN_NAME` - Your actual domain

### Step 5: SSL Certificate Setup

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot certonly --standalone -d your-domain.com --email your-email@domain.com

# Copy certificates to application directory
sudo mkdir -p ssl/certs ssl/private
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ssl/certs/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ssl/private/
sudo chown -R $USER:$USER ssl/
```

### Step 6: Deploy Services

```bash
# Build and start services
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Check service status
docker-compose -f docker-compose.prod.yml ps
```

## 🔒 Security Configuration

### Firewall Setup

```bash
# Configure UFW firewall
sudo ufw --force enable
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force reload
```

### Fail2ban Protection

```bash
# Install and configure fail2ban
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Create custom configuration
sudo nano /etc/fail2ban/jail.local
```

### SSL/TLS Security

The production configuration includes:
- TLS 1.2+ only
- Strong cipher suites
- HSTS headers
- Security headers (X-Frame-Options, CSP, etc.)

## 📊 Monitoring & Maintenance

### Health Checks

All services include health check endpoints:
- Auth Service: `https://your-domain.com/auth/health`
- Profile Service: `https://your-domain.com/profile/health`
- Nginx: `https://your-domain.com/health`

### Log Management

```bash
# View service logs
docker-compose -f docker-compose.prod.yml logs -f

# View specific service logs
docker-compose -f docker-compose.prod.yml logs -f nginx

# Check system logs
sudo journalctl -u transcendence.service -f
```

### Backup Strategy

```bash
# Manual backup
./backup.sh

# Automatic backups run daily at 2 AM
# Backups are kept for 30 days
```

### Performance Monitoring

```bash
# Check system resources
htop
df -h
free -h

# Monitor Docker resources
docker stats

# Check service health
./monitor.sh
```

## 🚨 Troubleshooting

### Common Issues

1. **Services not starting**
   ```bash
   # Check logs
   docker-compose -f docker-compose.prod.yml logs
   
   # Check environment variables
   docker-compose -f docker-compose.prod.yml config
   ```

2. **SSL certificate issues**
   ```bash
   # Renew certificate
   sudo certbot renew
   
   # Check certificate status
   sudo certbot certificates
   ```

3. **Port conflicts**
   ```bash
   # Check what's using ports 80/443
   sudo netstat -tlnp | grep :80
   sudo netstat -tlnp | grep :443
   ```

4. **Memory issues**
   ```bash
   # Check memory usage
   free -h
   
   # Check Docker memory limits
   docker stats --no-stream
   ```

### Service Recovery

```bash
# Restart specific service
docker-compose -f docker-compose.prod.yml restart auth

# Restart all services
docker-compose -f docker-compose.prod.yml restart

# Rebuild and restart
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

## 🔄 Updates & Maintenance

### Application Updates

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart services
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

### System Updates

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io
```

### SSL Certificate Renewal

```bash
# Test renewal
sudo certbot renew --dry-run

# Manual renewal
sudo certbot renew
```

## 📈 Scaling Considerations

### Vertical Scaling

- Increase EC2 instance size (t3.large, t3.xlarge)
- Add more CPU and memory resources
- Optimize Docker resource limits

### Horizontal Scaling

- Use load balancer (ALB/ELB)
- Deploy multiple EC2 instances
- Implement database clustering
- Use managed Redis/ElastiCache
- Use managed RabbitMQ/Amazon MQ

### Performance Optimization

- Enable Docker build cache
- Use multi-stage builds
- Implement proper logging levels
- Add application-level caching
- Optimize database queries

## 🆘 Support & Resources

### Useful Commands

```bash
# Service management
sudo systemctl status transcendence.service
sudo systemctl restart transcendence.service

# Docker management
docker system prune -a
docker volume ls
docker network ls

# Log analysis
docker-compose -f docker-compose.prod.yml logs --tail=100 | grep ERROR
```

### Monitoring Tools

- **Built-in**: `./monitor.sh`
- **System**: `htop`, `iotop`, `nethogs`
- **Docker**: `docker stats`, `docker top`
- **Logs**: `journalctl`, `docker logs`

### Backup & Recovery

- **Daily backups**: Automatic at 2 AM
- **Manual backups**: `./backup.sh`
- **Recovery**: Extract backup and redeploy
- **Off-site storage**: Consider S3 for critical backups

## 📝 Configuration Files

### Key Files

- `docker-compose.prod.yml` - Production services
- `client/nginx/nginx.prod.conf` - Production Nginx config
- `server/*/Dockerfile.prod` - Production Dockerfiles
- `.env.prod` - Production environment variables
- `deploy-ec2.sh` - Automated deployment script

### Customization

- Modify Nginx configuration for custom domains
- Adjust Docker resource limits
- Customize health check endpoints
- Add custom monitoring metrics
- Configure custom backup strategies

---

**⚠️ Important Notes:**
- Always test in staging environment first
- Keep backups before major updates
- Monitor system resources regularly
- Set up proper alerting for production
- Document any custom configurations
- Plan for disaster recovery scenarios
