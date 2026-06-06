FROM node:20-alpine

RUN apk add --no-cache openssl libc6-compat
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3002

# CMD ["node", "dist/server.js"]
CMD npx prisma db push --schema=./prisma/schema.prisma && npm run dev
