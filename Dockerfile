FROM node:12
WORKDIR /usr/src/app
COPY . .
RUN cd frontend && yarn install && yarn build
RUN npm ci --only=production
EXPOSE 5000 8000
CMD ["npm", "start"]
