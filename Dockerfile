FROM node:18
WORKDIR /usr/src/app
COPY . .
RUN rm -rf node_modules frontend/node_modules

RUN cd frontend && yarn install && yarn build
RUN npm ci --only=production

# create version information
RUN npm run version

EXPOSE 5000
CMD npm start
