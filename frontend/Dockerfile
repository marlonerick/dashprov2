# Etapa de build do React
FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Etapa para servir com Nginx
FROM nginx:1.25.3-alpine
RUN apk update && apk upgrade
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]