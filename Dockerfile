FROM node:17.3

WORKDIR /app

COPY ["./", "./"]

RUN npm install

CMD [ "npm", "run", "dev2" ]

EXPOSE 8000