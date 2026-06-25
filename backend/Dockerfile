FROM node:22-alpine
WORKDIR /app
RUN apk add --no-cache openssl
COPY package*.json ./
RUN npm install
COPY . .
# Gera o Prisma Client no build (precisa do schema, já copiado acima).
RUN npx prisma generate
EXPOSE 3001
# Sincroniza o schema com o banco, cria o admin inicial (idempotente) e sobe a API.
# O docker-compose só inicia este serviço quando o Postgres está healthy.
CMD ["sh", "-c", "npx prisma db push --skip-generate --accept-data-loss && node prisma/seed.js && node src/server.js"]
