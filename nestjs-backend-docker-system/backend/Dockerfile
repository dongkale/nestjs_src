FROM keymetrics/pm2:14-alpine
RUN ls
# Bundle APP files
ENV TZ=Asia/Seoul
WORKDIR /usr/src/app
COPY ./backend .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn

# devDependencies를 제외하고 설치
RUN npm install --production
RUN npm run build
# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "pm2.json", "--env", "production"]