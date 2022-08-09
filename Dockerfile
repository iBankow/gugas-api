FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN node ace build --production
RUN cd build
RUN node ace migration:run
RUN node ace db:seed
CMD ["npm", "start"]