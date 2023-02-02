FROM node

WORKDIR /app/user

COPY package.json .

RUN npm install
RUN rm -rf node_modules/
RUN npm update
RUN npm uninstall bcrypt
RUN npm install bcryptjs
RUN npm install bcrypt

COPY . .

EXPOSE 8001

CMD ["npm","start"]