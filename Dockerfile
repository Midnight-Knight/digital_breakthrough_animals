FROM node:20.10.0-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g npm@latest
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 80
CMD ["npm", "run", "start"]