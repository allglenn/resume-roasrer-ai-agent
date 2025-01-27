FROM node:16-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm install

# Copy configuration files
COPY tailwind.config.js postcss.config.js ./

# Copy the rest of the application
COPY . .

EXPOSE 3000

CMD ["npm", "start"] 