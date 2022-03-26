# Install dependencies only when needed
FROM node:16-alpine

WORKDIR /frontend

COPY . .

# building the app
RUN npm i
RUN npm run build

# Running the app
CMD [ "npm", "start" ]
