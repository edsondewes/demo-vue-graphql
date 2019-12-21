FROM node:13.4-alpine
WORKDIR /usr/src/app

ENV NODE_ENV="production"
COPY package.json package-lock.json ./
RUN npm install
COPY . .

EXPOSE 80
ENTRYPOINT ["node", "index.js"]