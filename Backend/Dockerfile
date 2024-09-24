FROM node 
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "node", "server.js" ]
EXPOSE 8070