#!/bin/bash
npm ci || exit $?
npm run build || exit $?
BRANCH=$(git rev-parse --abbrev-ref HEAD)
./node_modules/.bin/firebase hosting:channel:deploy $BRANCH
