FROM node


WORKDIR /app
COPY . .

RUN npm install --omit-dev

CMD {"node", "app.js"}