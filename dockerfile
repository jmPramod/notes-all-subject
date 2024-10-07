FROM node:latest
WORKDIR /src/app
COPY . .
RUN npm install
EXPOSE 5678
CMD [ "npm","start" ]