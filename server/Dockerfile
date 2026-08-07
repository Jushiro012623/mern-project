FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package*.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn install

COPY . .

EXPOSE 3000

CMD yarn start:dev
