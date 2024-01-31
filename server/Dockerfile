# Specify a base image
FROM node:14

# Set a working directory
WORKDIR dist

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Set environment variables, if any
# ENV NODE_ENV=production

# Expose the port the app runs in
EXPOSE 5000

# Serve the app
CMD ["npm", "start"]