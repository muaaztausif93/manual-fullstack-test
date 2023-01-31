FROM node:16.10-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY . .

RUN npm install
ENV NODE_ENV=development
ENTRYPOINT ["sh", "./docker-entrypoint.sh"]
EXPOSE 8000
CMD ["npm", "run", "start:dev:ts-watch"]
