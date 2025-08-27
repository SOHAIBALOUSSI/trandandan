#!/bin/bash

# Production Monitoring Script for Transcendence Project
# This script provides comprehensive monitoring of the production environment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="transcendence"
COMPOSE_FILE="docker-compose.prod.yml"
DOMAIN="${DOMAIN:-localhost}"

# Function to print colored output
print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to format bytes to human readable
format_bytes() {
    local bytes=$1
    if [ $bytes -gt 1073741824 ]; then
        echo "$(echo "scale=2; $bytes/1073741824" | bc) GB"
    elif [ $bytes -gt 1048576 ]; then
        echo "$(echo "scale=2; $bytes/1048576" | bc) MB"
    elif [ $bytes -gt 1024 ]; then
        echo "$(echo "scale=2; $bytes/1024" | bc) KB"
    else
        echo "$bytes bytes"
    fi
}

# Function to check service health
check_service_health() {
    local service=$1
    local port=$2
    
    if curl -s -f "http://localhost:$port/health" >/dev/null 2>&1; then
        print_success "$service is healthy"
        return 0
    else
        print_error "$service health check failed"
        return 1
    fi
}

# Function to check external health
check_external_health() {
    if curl -s -f "https://$DOMAIN/health" >/dev/null 2>&1; then
        print_success "External health check passed"
        return 0
    else
        print_error "External health check failed"
        return 1
    fi
}

# Main monitoring function
main() {
    echo -e "${PURPLE}🔍 Transcendence Production Monitoring${NC}"
    echo "Timestamp: $(date)"
    echo "Domain: $DOMAIN"
    echo ""

    # System Status
    print_header "System Status"
    echo "Hostname: $(hostname)"
    echo "Uptime: $(uptime -p)"
    echo "Load Average: $(uptime | awk -F'load average:' '{print $2}')"
    echo ""

    # Memory Status
    print_header "Memory Status"
    local mem_info=$(free -h | grep Mem)
    local mem_total=$(echo $mem_info | awk '{print $2}')
    local mem_used=$(echo $mem_info | awk '{print $3}')
    local mem_free=$(echo $mem_info | awk '{print $4}')
    local mem_available=$(echo $mem_info | awk '{print $7}')
    
    echo "Total: $mem_total"
    echo "Used: $mem_used"
    echo "Free: $mem_free"
    echo "Available: $mem_available"
    
    # Calculate memory usage percentage
    local mem_used_bytes=$(free | grep Mem | awk '{print $3}')
    local mem_total_bytes=$(free | grep Mem | awk '{print $2}')
    local mem_usage_percent=$((mem_used_bytes * 100 / mem_total_bytes))
    
    if [ $mem_usage_percent -gt 90 ]; then
        print_error "Memory usage is critical: ${mem_usage_percent}%"
    elif [ $mem_usage_percent -gt 80 ]; then
        print_warning "Memory usage is high: ${mem_usage_percent}%"
    else
        print_success "Memory usage is normal: ${mem_usage_percent}%"
    fi
    echo ""

    # Disk Status
    print_header "Disk Status"
    local disk_info=$(df -h / | tail -1)
    local disk_total=$(echo $disk_info | awk '{print $2}')
    local disk_used=$(echo $disk_info | awk '{print $3}')
    local disk_available=$(echo $disk_info | awk '{print $4}')
    local disk_usage=$(echo $disk_info | awk '{print $5}' | sed 's/%//')
    
    echo "Total: $disk_total"
    echo "Used: $disk_used"
    echo "Available: $disk_available"
    echo "Usage: ${disk_usage}%"
    
    if [ $disk_usage -gt 90 ]; then
        print_error "Disk usage is critical: ${disk_usage}%"
    elif [ $disk_usage -gt 80 ]; then
        print_warning "Disk usage is high: ${disk_usage}%"
    else
        print_success "Disk usage is normal: ${disk_usage}%"
    fi
    echo ""

    # Network Status
    print_header "Network Status"
    if command_exists ss; then
        echo "Active connections: $(ss -tuln | wc -l)"
        echo "Listening ports:"
        ss -tuln | grep LISTEN | awk '{print $5}' | sort | uniq
    else
        echo "ss command not available"
    fi
    echo ""

    # Docker Status
    print_header "Docker Status"
    if command_exists docker; then
        echo "Docker version: $(docker --version)"
        echo "Docker Compose version: $(docker-compose --version)"
        echo ""
        
        # Check if compose file exists
        if [ -f "$COMPOSE_FILE" ]; then
            echo "Compose file: $COMPOSE_FILE"
            
            # Check service status
            if docker-compose -f "$COMPOSE_FILE" ps >/dev/null 2>&1; then
                print_info "Service Status:"
                docker-compose -f "$COMPOSE_FILE" ps
                echo ""
                
                # Check service health
                print_info "Service Health Checks:"
                check_service_health "Nginx" "80" || true
                check_external_health || true
                
            else
                print_error "Failed to get service status"
            fi
        else
            print_warning "Compose file not found: $COMPOSE_FILE"
        fi
        
        # Docker system info
        echo ""
        print_info "Docker System Info:"
        docker system df --format "table {{.Type}}\t{{.TotalCount}}\t{{.Size}}\t{{.Reclaimable}}"
        
    else
        print_error "Docker not installed or not accessible"
    fi
    echo ""

    # Service Logs
    print_header "Recent Service Logs"
    if [ -f "$COMPOSE_FILE" ] && command_exists docker-compose; then
        docker-compose -f "$COMPOSE_FILE" logs --tail=10 --timestamps
    else
        print_warning "Cannot retrieve service logs"
    fi
    echo ""

    # Process Status
    print_header "Process Status"
    echo "Top processes by CPU:"
    ps aux --sort=-%cpu | head -6
    echo ""
    echo "Top processes by Memory:"
    ps aux --sort=-%mem | head -6
    echo ""

    # Security Status
    print_header "Security Status"
    
    # Check UFW status
    if command_exists ufw; then
        local ufw_status=$(sudo ufw status | head -1)
        if [[ $ufw_status == *"Status: active"* ]]; then
            print_success "UFW firewall is active"
        else
            print_warning "UFW firewall is not active"
        fi
    fi
    
    # Check fail2ban status
    if command_exists fail2ban-client; then
        local fail2ban_status=$(sudo fail2ban-client status | head -1)
        if [[ $fail2ban_status == *"Status"* ]]; then
            print_success "Fail2ban is running"
        else
            print_warning "Fail2ban is not running"
        fi
    fi
    
    # Check SSL certificate expiry
    if [ "$DOMAIN" != "localhost" ]; then
        local cert_expiry=$(echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null | openssl x509 -noout -dates | grep notAfter | cut -d= -f2)
        if [ ! -z "$cert_expiry" ]; then
            local expiry_date=$(date -d "$cert_expiry" +%s)
            local current_date=$(date +%s)
            local days_until_expiry=$(( (expiry_date - current_date) / 86400 ))
            
            if [ $days_until_expiry -lt 7 ]; then
                print_error "SSL certificate expires in $days_until_expiry days"
            elif [ $days_until_expiry -lt 30 ]; then
                print_warning "SSL certificate expires in $days_until_expiry days"
            else
                print_success "SSL certificate expires in $days_until_expiry days"
            fi
        fi
    fi
    echo ""

    # Performance Metrics
    print_header "Performance Metrics"
    
    # CPU usage
    local cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | awk -F'%' '{print $1}')
    echo "CPU Usage: ${cpu_usage}%"
    
    if (( $(echo "$cpu_usage > 90" | bc -l) )); then
        print_error "CPU usage is critical"
    elif (( $(echo "$cpu_usage > 80" | bc -l) )); then
        print_warning "CPU usage is high"
    else
        print_success "CPU usage is normal"
    fi
    
    # Load average
    local load_avg=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')
    local cpu_cores=$(nproc)
    local load_per_core=$(echo "scale=2; $load_avg / $cpu_cores" | bc)
    
    echo "Load per CPU core: $load_per_core"
    
    if (( $(echo "$load_per_core > 2" | bc -l) )); then
        print_error "Load per CPU core is high"
    elif (( $(echo "$load_per_core > 1" | bc -l) )); then
        print_warning "Load per CPU core is moderate"
    else
        print_success "Load per CPU core is normal"
    fi
    echo ""

    # Summary
    print_header "Summary"
    echo "Monitoring completed at: $(date)"
    echo ""
    echo "Next steps:"
    echo "1. Review any warnings or errors above"
    echo "2. Check logs for specific issues: docker-compose -f $COMPOSE_FILE logs -f"
    echo "3. Monitor system resources: htop"
    echo "4. Check service health: curl -f https://$DOMAIN/health"
    echo "5. Review security status: sudo ufw status && sudo fail2ban-client status"
}

# Run main function
main "$@"
