FROM node:18.19.0-slim

WORKDIR /home/node/app

COPY package.json .

COPY . .

CMD ["tail", "-f" ,"/dev/null"]

#CMD ["npm", "run" ,"dev:json-server"]