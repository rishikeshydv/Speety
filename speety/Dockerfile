FROM node:lts-alpine3.20

WORKDIR /app
COPY package.json .
RUN npm install --production --ignore-scripts
COPY . .
RUN npm run build
CMD ["npm","run"]



