#!/bin/sh

VERSION=0.1.0
deno run -A ./build_npm.ts $VERSION

#cd ../npm
#npm publish