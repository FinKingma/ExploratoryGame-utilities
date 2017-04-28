#FROM alpine:3.2
FROM node:alpine

MAINTAINER Fin Kingma

#installing Exploratory Testing Game in container

RUN mkdir -p /usr/src/etg
WORKDIR /usr/src/etg
COPY package.json /usr/src/etg/
RUN npm install
COPY . /usr/src/etg

EXPOSE 2000

CMD [ "npm", "start" ]