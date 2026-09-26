FROM node

WORKDIR /app

# Root package.json
COPY package*.json ./
RUN npm install

#Gateway package.json
COPY ./gateway/package*.json ./gateway/
RUN cd gateway && npm install

COPY gateway ./gateway
COPY shared ./shared

WORKDIR /app/gateway

EXPOSE 8000

CMD [ "npm","start" ]

