FROM node:23-alpine AS builder
ARG VITE_API_URL
ARG VITE_SOCKET_URL
ARG VITE_SOCKET_PATH
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL
ENV VITE_SOCKET_PATH=$VITE_SOCKET_PATH
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN nginx -t

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3100

CMD ["nginx", "-g", "daemon off;"]
