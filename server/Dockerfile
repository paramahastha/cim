FROM node:latest

WORKDIR /usr/app

COPY package*.json ./
RUN npm i -qy

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
