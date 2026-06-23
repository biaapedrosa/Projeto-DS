FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Gera o Prisma Client no build (precisa do schema, já copiado acima).
RUN npx prisma generate
EXPOSE 3001
# Sincroniza o schema com o banco, cria o admin inicial (idempotente) e sobe a API.
# O docker-compose só inicia este serviço quando o Postgres está healthy.
CMD ["sh", "-c", "npx prisma db push --skip-generate && node prisma/seed.js && node src/server.js"]
