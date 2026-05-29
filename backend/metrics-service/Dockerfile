FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3003

CMD ["sh", "-c", "npx prisma generate && npm run dev"]
