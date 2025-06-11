FROM node:22

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# Expõe a porta do backend (ajuste conforme necessário)
EXPOSE 8000

# Comando para iniciar o backend
CMD ["node", "src/app.js"]