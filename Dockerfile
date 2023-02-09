FROM node:16.3.0-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm i
ARG PORT
ENV PORT $PORT
ARG DB_URL
ENV DB_URL $DB_URL
COPY . .
CMD ["npm","start"]