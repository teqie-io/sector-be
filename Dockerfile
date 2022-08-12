FROM node:lts-alpine as builder

WORKDIR /usr/src/app

COPY ./src ./src
COPY ./package*.json .
COPY ./tsconfig*.json .

RUN yarn install -y 
RUN yarn build  && yarn cache clean

EXPOSE 3000
ENV NODE_ENV=production


CMD ["yarn", "serve"]
# CMD ["ls", "-la"]