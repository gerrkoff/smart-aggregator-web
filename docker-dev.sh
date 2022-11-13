#!/bin/sh
docker build -t smart-aggregator-web . || exit $?
docker run -t --rm \
    -p 5000:5000 \
    --name smart-aggregator-web-dev \
    smart-aggregator-web \
    npm run dev

