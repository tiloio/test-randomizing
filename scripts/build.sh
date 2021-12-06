#!/bin/sh

VERSION=0.1.1
deno run -A ./scripts/build_npm.ts $VERSION

cd ./npm
npm publish