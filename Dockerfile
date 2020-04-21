FROM node:10.20.1

WORKDIR /app

ADD . /app

RUN yarn

RUN yarn global add pm2 

# build froend
RUN yarn build:react 

# build server
RUN yarn build:server

RUN mkdir ./build/public

EXPOSE 1337

CMD pm2-runtime process.yml
# CMD yarn dev:s