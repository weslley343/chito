# Usar a imagem base do Node.js
FROM node:20-alpine

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos do package.json e package-lock.json antes de instalar as dependências
COPY package.json package-lock.json ./

# Instalar as dependências da aplicação
RUN npm install

# Copiar todo o restante do código-fonte
COPY . .

RUN npm run uuid_setup
RUN npm run scales
RUN npm run crisis_report
RUN npm run m_chat

# Definir a variável de ambiente padrão
ENV NODE_ENV=production

# Expor a porta que a aplicação usa
EXPOSE 4000

# Comando de inicialização da aplicação
CMD ["npm ", "run", "dev"]
