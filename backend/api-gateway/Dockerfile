FROM node:18

WORKDIR /app

COPY package*.json ./

# Fix npm registry & DNS issues
RUN npm config set registry https://registry.npmjs.org/
RUN npm cache clean --force

#npm install --production unnecessary dev dependencies install nahi karta (nodemon etc.)
# RUN npm install --production  
RUN npm install --legacy-peer-deps

COPY . .

ENV PORT=8000

EXPOSE 8000

CMD ["npm", "start"]
