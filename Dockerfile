FROM node:18
RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .

## project dependency install
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

EXPOSE 8912
CMD ["node", "dist/main.js"]