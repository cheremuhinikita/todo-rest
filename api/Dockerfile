FROM node:14

WORKDIR /usr/todo/api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${API_PORT}
CMD [ "npm", "run", "start:prod" ]