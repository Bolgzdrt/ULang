FROM node:12.15.0-alpine

WORKDIR /app

COPY packag*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "serve"]
