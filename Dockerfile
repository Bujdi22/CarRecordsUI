# Use official nginx image
FROM nginx:alpine

# Copy the built app to the Nginx html directory
COPY ./dist /usr/share/nginx/html

# Copy custom nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80