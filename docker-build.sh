#!/bin/sh
rm -rf build
docker build -t smart-aggregator-web . || exit $?
docker run -t --rm \
    -v "$(pwd)/build":/app/.next \
    --name smart-aggregator-web-build \
    smart-aggregator-web \
    npm run build
