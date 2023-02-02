FROM node

WORKDIR /app/review

COPY package.json .

RUN npm install
RUN rm -rf node_modules/
RUN npm update
RUN npm uninstall bcrypt
RUN npm install bcryptjs
RUN npm install bcrypt

COPY . .

EXPOSE 8003

CMD ["npm","start"]