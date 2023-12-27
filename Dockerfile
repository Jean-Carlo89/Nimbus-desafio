FROM node:18.19.0-slim

WORKDIR /home/node/app

COPY package.json .

RUN npm i

COPY . .

#CMD ["tail", "-f" ,"/dev/null"]

CMD ["npm", "run" ,"dev"]