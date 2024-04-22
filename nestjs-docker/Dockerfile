FROM node:20-alpine

WORKDIR /app

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

COPY package.json ./
COPY .env ./

# RUN npm config set strict-ssl false
# RUN NODE_TLS_REJECT_UNAUTHORIZED=0 npm run build
RUN npm config set strict-ssl false && npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:dev"]