#!/bin/bash

WD=$(pwd)
CLONE_DIR="/go/website"
git clone https://${GITHUB_TOKEN}@github.com/aerokube/aerokube.github.io.git ${CLONE_DIR}
cd ${CLONE_DIR}
git config user.name ${DRONE_COMMIT_AUTHOR}
git config user.email ${DRONE_COMMIT_AUTHOR_EMAIL}
cp -R ${WD}/dist/* ${CLONE_DIR}
git add --all
git commit -am "Updated by ${DRONE_COMMIT_AUTHOR}"
git push origin HEAD:master