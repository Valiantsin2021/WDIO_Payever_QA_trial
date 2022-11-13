FROM node:alpine

WORKDIR /app
ADD . /app

RUN npm install

CMD npm run run:github
ENTRYPOINT ["npm", "run", "run:github"]