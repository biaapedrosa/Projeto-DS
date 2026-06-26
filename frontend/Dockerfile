# build do frontend
FROM node:22-alpine AS build
WORKDIR /app

ARG VITE_BASE=/nutricao/
ARG VITE_API_URL=
ENV VITE_BASE=$VITE_BASE
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# imagem final só para copiar o dist para /output
FROM alpine:3.20
WORKDIR /app
COPY --from=build /app/dist /dist
CMD ["sh", "-c", "rm -rf /output/* && cp -r /dist/. /output/"]