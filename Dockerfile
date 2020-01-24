FROM node:10

WORKDIR /usr/src/app
RUN mkdir json

COPY package*.json ./

COPY ./ ./

RUN npm install

RUN node client.js