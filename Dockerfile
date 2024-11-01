FROM node:16
WORKDIR /usr/src/app
COPY . .

RUN cd frontend && yarn install && yarn build
RUN npm ci --only=production

# create version information
RUN npm run version

EXPOSE 5000
CMD npm start
