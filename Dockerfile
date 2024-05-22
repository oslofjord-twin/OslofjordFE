FROM node:18.17.0-alpine3.17

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY ./oslofjord-app/package.json .

RUN npm install

# If you are building your code for production
# RUN npm ci --omit=dev

COPY ./oslofjord-app/app/ ./app/
COPY ./oslofjord-app/tsconfig.json .
COPY ./oslofjord-app/tailwind.config.ts .
COPY ./oslofjord-app/postcss.config.js .
COPY ./oslofjord-app/next.config.js .
COPY ./oslofjord-app/public ./public

RUN npm run build

EXPOSE 3000:3000
CMD [ "npm", "run", "start"]
