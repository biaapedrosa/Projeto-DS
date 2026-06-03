FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["sh", "-c", "until node src/db/migrations/005_run_migrations.js; do echo 'Aguardando banco...'; sleep 2; done && npm run dev"]
