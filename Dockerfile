FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN node ace build --production
RUN cd build