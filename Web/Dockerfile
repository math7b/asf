FROM node:18 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install --omit=dev

FROM node:18-alpine3.19 AS alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

# FROM node:18-slim

# WORKDIR /usr/src/app

# COPY --from=build /usr/src/app/dist /usr/src/app/dist

EXPOSE 3000

CMD ["npm", "run", "start"]
