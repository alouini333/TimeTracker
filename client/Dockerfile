# Dockerfile for client

# Stage 1: Build react client
FROM node:lts-alpine3.10

# Working directory be app
WORKDIR /usr/app

COPY package*.json ./
COPY .env.example .env

# Install dependencies
RUN yarn install

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["yarn","start"]