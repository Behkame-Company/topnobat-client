# base stage
FROM node:20.9.0 as base

ENV NODE_ENV=development

WORKDIR /app/client

# build stage
FROM base as build

COPY package*.json .

RUN npm install

COPY . .

RUN npm run generate

