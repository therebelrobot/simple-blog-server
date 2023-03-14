# Build stage
FROM node:14-alpine AS build
WORKDIR /app
COPY package*.json tsconfig.json yarn.lock /app/
RUN yarn install
COPY ./src /app/src
RUN yarn build:app

# Production stage
FROM node:14-alpine AS production
WORKDIR /app
COPY package*.json yarn.lock /app/
RUN yarn install --prod
COPY --from=build /app/dist /app/dist
EXPOSE 3000
CMD ["yarn", "start:app"]