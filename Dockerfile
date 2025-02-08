FROM node:23
WORKDIR usr/src/app

COPY ./package.json ./package-lock.json ./
RUN npm install



COPY . .
RUN npm run build
EXPOSE 4001


