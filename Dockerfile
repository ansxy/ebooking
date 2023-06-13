FROM node:latest

WORKDIR /usr/src/user-service
# generated prisma files
COPY prisma ./prisma/
COPY . .

# COPY ENV variable
COPY .env ./
COPY package*.json ./

RUN npm install
RUN npm install pnpm -g
EXPOSE 3000

# CMD npm start
CMD [ "pnpm", "run", "dev"]