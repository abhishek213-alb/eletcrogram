# Stage 1: Build the React application
FROM node:18-alpine as build

WORKDIR /app

# Add Build Arguments for VITE environment variables
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the build output from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config with hardened security headers
RUN echo 'server { \
    listen 8080; \
    server_tokens off; \
    add_header Content-Security-Policy "default-src '\''self'\''; script-src '\''self'\'' '\''unsafe-inline'\'' https://translate.google.com https://translate.googleapis.com; style-src '\''self'\'' '\''unsafe-inline'\'' https://fonts.googleapis.com https://translate.googleapis.com; font-src '\''self'\'' https://fonts.gstatic.com; img-src '\''self'\'' data: https://images.unsplash.com https://upload.wikimedia.org https://storage.googleapis.com https://www.google.com https://translate.google.com; connect-src '\''self'\'' https://*.run.app https://generativelanguage.googleapis.com; frame-src '\''self'\'' https://www.google.com https://translate.google.com; object-src '\''none'\''; upgrade-insecure-requests;" always; \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header Referrer-Policy "strict-origin-when-cross-origin" always; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Cloud Run expects the container to listen on $PORT
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
