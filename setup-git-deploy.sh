#!/bin/bash
# Script to set up Git deployment on server

set -e

echo "========================================"
echo "GitHub Deployment Setup"
echo "========================================"
echo ""

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "Git not found. Installing..."
    sudo apt install -y git || {
        echo "❌ Could not install Git via apt"
        echo "Please install Git manually or use alternative method"
        exit 1
    }
else
    echo "✅ Git is installed: $(git --version)"
fi

echo ""
echo "========================================"
echo "Next Steps:"
echo "========================================"
echo ""
echo "1. Make sure your code is on GitHub"
echo "2. Run these commands:"
echo ""
echo "   cd /var/www"
echo "   sudo git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git kenmccoy"
echo "   sudo chown -R web:web kenmccoy"
echo "   cd kenmccoy"
echo ""
echo "3. If repository is private, use:"
echo "   - Personal Access Token, OR"
echo "   - SSH key (see DEPLOY_VIA_GITHUB.md)"
echo ""











