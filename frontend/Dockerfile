# Stage 1: Build the React application
FROM node:16 as build

# Set the working directory in the container
WORKDIR /app

# ARG instruction to declare the build-time environment variable
ARG REACT_APP_API_BASE_URL

# Use the ARG to set the environment variable for the build stage
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

# Copy package.json and package-lock.json to work directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application's code
COPY . ./

# Build the application
RUN npm run build

# Stage 2: Serve the application from Nginx
FROM nginx:alpine

# Copy the built assets from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000 to the Docker host, so we can access it from the outside
EXPOSE 3000

# When the container starts, run the nginx server
CMD ["nginx", "-g", "daemon off;"]
