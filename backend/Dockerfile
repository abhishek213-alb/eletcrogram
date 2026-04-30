# Use Node.js 18 alpine for a small footprint
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built files (assuming build happens before or during docker build)
# For Cloud Run, we usually build inside the docker to ensure consistency
COPY . .
RUN npm install && npm run build

# Set environment to production
ENV NODE_ENV=production

# Cloud Run uses the PORT environment variable
ENV PORT=8080
EXPOSE 8080

# Start the application
CMD [ "npm", "start" ]
