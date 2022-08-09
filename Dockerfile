FROM nodejs:16
RUN npm install
RUN node ace build --production
RUN cd build