# Use the official Node.js v18 base image (Debian-based by default)
FROM node:18.20-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code to the working directory
COPY . .

# Expose the application port (change 3000 if your app uses a different port)
EXPOSE 3000

# Define the command to run the applicationz
CMD ["npm", "start"]
