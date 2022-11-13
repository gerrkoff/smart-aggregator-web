FROM node:16.13.2-alpine

RUN apk update
RUN apk add git

COPY package.json /app/
COPY package-lock.json /app/
WORKDIR /app

RUN npm ci

COPY . /app/

RUN git clean -fdn