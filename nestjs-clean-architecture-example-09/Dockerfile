# 
# DEVELOPMENT
# 
FROM node:18-alpine as development

# create app directory
WORKDIR /usr/src/app

# change owner and copy package.json
COPY --chown=node:node ./package.json .

# install deps
RUN yarn

# bundle app source
COPY --chown=node:node . .

# use node user from this image
USER node

# 
# BUILD
# 
FROM node:18-alpine as build
WORKDIR /usr/src/app
COPY --chown=node:node ./package.json .

# copy installed dependencies from development stage
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# build this application
RUN yarn build

# set node_env to production
ENV NODE_ENV production

# install deps
RUN yarn

USER node

# 
# PRODUCTION
# 
FROM node:18-alpine as production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
CMD [ "node", "dist/main.js" ]
