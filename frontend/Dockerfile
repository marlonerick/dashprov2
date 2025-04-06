# Etapa 1: build do frontend
FROM node:20 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: produção com NGINX e backend
FROM nginx:alpine

# Copia arquivos do frontend já buildados
COPY --from=build /app/dist /usr/share/nginx/html

# Copia a config do NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o backend
COPY --from=build /app/backend /app/backend

# Copia o start.sh
COPY --from=build /app/start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Instala o Node no Alpine para rodar o backend
RUN apk add --no-cache nodejs npm

# Define diretório de trabalhogit
WORKDIR /app

# Instala dependências do backend
RUN cd backend && npm install

# Porta
EXPOSE 8000

# Início
CMD ["sh", "/app/start.sh"]
