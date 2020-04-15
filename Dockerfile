FROM node:10.20.1

WORKDIR /app

# RUN npm install yarn -g

ADD . /app

RUN yarn

RUN yarn build:react

EXPOSE 1337

CMD yarn dev:s