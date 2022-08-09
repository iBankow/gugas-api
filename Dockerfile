FROM node:16-alpine
RUN npm install
RUN node ace build --production
RUN cd build