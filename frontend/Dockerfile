# Stage 1: Build the React application
FROM node:18-alpine as build

WORKDIR /app

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

# Copy custom nginx config if needed (for SPA routing)
RUN echo 'server { \
    listen 8080; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Cloud Run expects the container to listen on $PORT, which is often 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
