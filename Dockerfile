# Etapa 1 - Build do Frontend
FROM node:18 AS frontend-build
WORKDIR /app
COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm install && npm run build

# Etapa 2 - Setup do Backend
FROM node:18 AS backend
WORKDIR /app
COPY backend ./backend
WORKDIR /app/backend
RUN npm install

# Etapa 3 - Container final com NGINX
FROM nginx:alpine
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=backend /app/backend /app/backend
WORKDIR /app/backend
EXPOSE 10000
CMD ["sh", "-c", "node index.js & nginx -g 'daemon off;'"]