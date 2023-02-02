FROM node

WORKDIR /app/movie

COPY package.json .

RUN npm install
RUN rm -rf node_modules/
RUN npm uninstall bcrypt
RUN npm install bcryptjs
RUN npm install bcrypt
RUN npm update

COPY . .

EXPOSE 8002

CMD ["npm","start"]