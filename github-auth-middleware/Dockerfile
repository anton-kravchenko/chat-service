
FROM mhart/alpine-node:12

WORKDIR /usr/src/app

COPY index.js .
COPY package.json .
COPY package-lock.json .

RUN npm ci

EXPOSE 8125
CMD [ "node", "index.js" ]
