## declare base image - node 18
FROM node:18
## make work directory and copy files
WORKDIR /app
COPY . .
## project dependency install
RUN npm install -g pnpm
RUN pnpm
RUN pnpm build

FROM node:18
WORKDIR /usr/src/app
COPY --from=builder /app ./

EXPOSE 8912
CMD pnpm start:prod