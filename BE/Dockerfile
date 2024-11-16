FROM node:18

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies including ts-node
RUN npm install
RUN npm install -g ts-node typescript

# Copy the rest of the application
COPY . .

# Generate Prisma Client
RUN npx prisma generate

EXPOSE 3000

# Use ts-node directly instead of building
CMD ["npx", "ts-node", "src/index.ts"]