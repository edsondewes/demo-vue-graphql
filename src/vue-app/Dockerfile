FROM node:13.4-alpine AS build-env
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .

ARG authUrl
ARG graphqlUrl
RUN npm run build -- --env.AUTH_URL=${authUrl} --env.GRAPHQL_URL=${graphqlUrl}

FROM nginx:mainline
COPY --from=build-env /app/dist /usr/share/nginx/html