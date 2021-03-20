FROM mhart/alpine-node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 8080

CMD [ "node", "dist/main.js" ]