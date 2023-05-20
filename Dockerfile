FROM node:18.13.0 as builder
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
run npm install
COPY . .
run npm run build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]