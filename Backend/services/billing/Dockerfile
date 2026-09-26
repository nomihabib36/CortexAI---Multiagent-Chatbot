FROM node

WORKDIR /app

# Root package.json
COPY package*.json ./
RUN npm install

#Gateway package.json
COPY ./services/billing/package*.json ./services/billing/
RUN cd services/billing && npm install

COPY services/billing ./services/billing/
COPY shared ./shared

WORKDIR /app/services/billing/

EXPOSE 8004

CMD [ "npm","start" ]

