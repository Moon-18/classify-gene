#!/bin/bash
pnpm run build

# Get current git branch name
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Get current git commit id
GIT_COMMIT=$(git rev-parse --short HEAD)

# image_name
IMAGE_NAME=nuxt-gene-$GIT_BRANCH-$GIT_COMMIT
echo  $IMAGE_NAME start build

# Save build log to a file
docker build --progress=plain -t $IMAGE_NAME . 2>&1 | tee build.log

docker run -d --name $IMAGE_NAME -p 3000:3000 $IMAGE_NAME
