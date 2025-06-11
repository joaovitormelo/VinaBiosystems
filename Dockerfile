FROM node:22

# Cria e define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY ./vina-biosystems/package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante da aplicação
COPY ./vina-biosystems/ .

# Configurações de porta
ENV PORT=9000
EXPOSE 9000

# Comando de inicialização
CMD ["npm", "start"]