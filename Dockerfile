FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN node ace build --production
EXPOSE 80
ARG HOST=${HOST}
ARG PORT=${PORT}
ARG NODE_ENV=${NODE_ENV}
ARG APP_KEY=${APP_KEY}
ARG DB_CONNECTION=${DB_CONNECTION}
ARG PG_HOST=${PG_HOST}
ARG PG_PORT=${PG_PORT}
ARG PG_USER=${PG_USER}
ARG PG_PASSWORD=${PG_PASSWORD}
ARG PG_DB_NAME=${PG_DB_NAME}
RUN cd build
RUN node ace migration:run
RUN node ace db:seed
CMD ["npm", "start"]