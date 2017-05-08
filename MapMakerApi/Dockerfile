#FROM alpine:3.2
FROM node:alpine

MAINTAINER Fin Kingma

#installing Exploratory Testing Game in container
RUN mkdir -p /usr/src/mm
WORKDIR /usr/src/mm
COPY package.json /usr/src/mm/
RUN npm install
COPY . /usr/src/mm

RUN npm install -g mocha
RUN npm run mocha

RUN npm run pact

EXPOSE 3000

CMD [ "npm", "start" ]