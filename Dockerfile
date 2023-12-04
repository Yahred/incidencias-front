FROM node:latest

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json ./

COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . ./

EXPOSE 5173

CMD [ "pnpm", "run", "dev" ]

