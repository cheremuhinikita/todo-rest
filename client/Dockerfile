FROM node:13.12.0-alpine as build

WORKDIR /usr/todo/clinet

ARG REACT_APP_API_URL

ENV PATH /usr/todo/clinet/node_modules/.bin:$PATH
ENV REACT_APP_API_URL $REACT_APP_API_URL

COPY package*.json ./

RUN npm i

COPY . ./

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /usr/todo/clinet/build /usr/share/nginx/html

COPY ./nginx.conf.template /nginx.conf.template

EXPOSE $CLIENT_PORT
CMD ["/bin/sh" , "-c" , "envsubst '$NGINX_PORT' < nginx.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]