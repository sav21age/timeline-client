FROM node:18-alpine as builder
WORKDIR /app
COPY . .

ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL $REACT_APP_SERVER_URL

ARG PUBLIC_URL
ENV PUBLIC_URL $PUBLIC_URL

RUN npm ci 
RUN npm run build

FROM nginx:1.23.3-alpine as production

ENV NODE_ENV production
COPY --from=builder /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]