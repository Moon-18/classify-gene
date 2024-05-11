FROM node:16-alpine AS deploy
WORKDIR /src
COPY . /src
RUN ls
CMD [ "node", ".output/server/index.mjs" ]