FROM node:23
WORKDIR usr/src/app


COPY package*.json ./
RUN npm install



COPY . .
RUN npm run build
RUN npx prisma generate
EXPOSE 4001


# Make the script executable

