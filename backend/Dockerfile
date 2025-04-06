FROM node:20

WORKDIR /app

# Copie apenas o package.json para instalar as dependências
COPY package*.json ./
RUN npm install

# Depois copie o restante dos arquivos (sem node_modules)
COPY . .

EXPOSE 8000
CMD ["node", "server.js"]
