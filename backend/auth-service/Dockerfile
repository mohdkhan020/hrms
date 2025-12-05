FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Very important: listen on 0.0.0.0 inside container
ENV PORT=7000

EXPOSE 7000

CMD ["npm", "start"]
