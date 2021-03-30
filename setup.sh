#!/bin/bash

set -e

echo "building server"
npm -C server run build

echo "building client" 
npm -C client run build

echo "creating build server folder" 
mkdir -p build
cp -r -v server/build/* build

echo "creating public folder" 
mkdir -p build/public
cp -r -v client/build/* build/public


