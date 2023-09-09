FROM node:18.17.1-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV NODE_ENV=production

EXPOSE 1337

RUN npm run build

CMD ["npm", "run", "start"]