#!/bin/bash

# Create uploads directory if it doesn't exist
mkdir -p uploads

# Set permissions
chmod 777 uploads

# Create .gitkeep to maintain directory in git
touch uploads/.gitkeep 