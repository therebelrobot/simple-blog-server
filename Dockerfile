FROM node:14-alpine AS build
WORKDIR /app
COPY ./ /app/
RUN yarn install
RUN yarn build:app
EXPOSE 3000
CMD ["yarn", "start:app"]
