FROM node:12.16.1-alpine

WORKDIR /usr/src/api

copy ./api/package.json ./

# RUN npm install -g yarn

RUN yarn install --silent --no-lockfile

EXPOSE 5000
CMD ["yarn", "start"]
