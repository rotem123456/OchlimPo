FROM node:18

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install && \
    npm install -g ts-node typescript nodemon bcrypt @types/bcrypt cors dotenv
COPY . .

# Generate Prisma Client
RUN npx prisma generate

EXPOSE 4000

CMD ["nodemon", "--exec", "ts-node", "src/index.ts"]