# Uses node version 22 as our base image
FROM node:22

# Goes to the ap directory
WORKDIR /vina-biosystems

# Copy package.json and package-lock.json
COPY vina-biosystems/package*.json ./

# Install app dependencies
RUN npm install

# Set port environment variable
ENV PORT=9000

# Expose the port do our computer can access it
EXPOSE 9000

# Run the app
CMD ["npm", "start"]