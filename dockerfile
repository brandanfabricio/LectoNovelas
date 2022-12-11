FROM node:18.4

WORKDIR /user/src/app/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm","run","dev"]