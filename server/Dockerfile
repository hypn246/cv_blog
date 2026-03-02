#server
FROM node:22-alpine3.19 AS builder

WORKDIR /be

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","start"]