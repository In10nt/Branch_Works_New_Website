#!/bin/bash
# EC2 Setup Script - Run this ON your EC2 instance after connecting

echo "=========================================="
echo "BranchWorks Backend - EC2 Setup"
echo "=========================================="

# Update system
echo "Step 1: Updating system..."
sudo apt update && sudo apt upgrade -y

# Install Java 17
echo "Step 2: Installing Java 17..."
sudo apt install openjdk-17-jdk -y

# Verify Java installation
echo "Step 3: Verifying Java..."
java -version

# Install screen (to keep app running)
echo "Step 4: Installing screen..."
sudo apt install screen -y

# Create app directory
echo "Step 5: Creating application directory..."
mkdir -p ~/branchworks
cd ~/branchworks

# Create data directory for H2 database
mkdir -p ~/branchworks/data

echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Upload your JAR file to ~/branchworks/"
echo "2. Run: cd ~/branchworks"
echo "3. Run: screen -S backend"
echo "4. Run: java -jar coming-soon-backend-0.0.1-SNAPSHOT.jar"
echo "5. Press Ctrl+A then D to detach"
echo ""
echo "Your backend will be at: http://YOUR-EC2-IP:5000"
echo "=========================================="
