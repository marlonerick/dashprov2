# Construindo o app React
FROM node:18 AS build
WORKDIR /app
COPY frontend/ .
RUN npm install
RUN npm run build

# Servindo com Nginx
FROM nginx:alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
