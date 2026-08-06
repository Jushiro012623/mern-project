FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package*.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn install

COPY . .

EXPOSE 5173

CMD ["yarn", "run", "dev"]
