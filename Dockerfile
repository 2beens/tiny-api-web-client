# Dockerize Vue.JS app:
# https://v2.vuejs.org/v2/cookbook/dockerize-vuejs-app.html

# to push the image to personal docker repo
# docker tag local-image:tagname new-repo:tagname
# docker push new-repo:tagname

# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
