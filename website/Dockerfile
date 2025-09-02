FROM node:18-alpine as build-stage

WORKDIR /react-app
COPY . /react-app

RUN npm install 

RUN npm run build

FROM nginx:stable-alpine as serve-stage

COPY ngnix.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /react-app/build /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]