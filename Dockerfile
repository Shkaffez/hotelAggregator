FROM node:latest AS development

WORKDIR /app

COPY package*.json ./

RUN npm install rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:latest as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]