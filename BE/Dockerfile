FROM node:18

WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install && \
    npm install -g ts-node typescript nodemon bcrypt @types/bcrypt cors dotenv axios

COPY . .

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "devStart"]