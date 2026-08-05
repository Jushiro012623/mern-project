FROM node:22-alpine

RUN addgroup -S app && adduser -S -G app app

WORKDIR /app

COPY --chown=app:app package*.json yarn.lock* ./

USER app

RUN yarn install

COPY --chown=app:app . .

EXPOSE 5173

CMD ["yarn", "run", "dev"]
