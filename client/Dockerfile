FROM node:lts-alpine

RUN mkdir -p /home/node/app && chown -R node:node /home/node

USER node

WORKDIR /home/node/app
ADD package*.json ./

RUN yarn install
