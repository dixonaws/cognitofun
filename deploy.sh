#!/usr/bin/env bash
npm run build
cp -Rvf dist prod/
cp -Rvf src/assets prod/
cp index.html prod
cd prod
aws s3 website s3://cognitofun --index-document "index.html" --error-document "error.html"
aws s3 sync . s3://cognitofun --acl "public-read"
cd ..

