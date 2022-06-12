#!/bin/bash
npm ci || exit $?
npm run build || exit $?
./node_modules/.bin/firebase deploy --only hosting
