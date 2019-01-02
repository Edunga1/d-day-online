#!/bin/bash
set -e

cd build
REPO=`git remote get-url origin`
DEPLOY_TIME=`date '+%Y-%m-%d %H:%M:%S'`
git init
git remote add origin $REPO
git add .
git commit -m "$DEPLOY_TIME"
git push -f origin HEAD:gh-pages
