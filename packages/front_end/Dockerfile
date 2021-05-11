# Dockerfile, Image, Container
FROM node:alpine as build

WORKDIR /jump-frontend

COPY package.json .

RUN npm install

COPY . .

ENV REACT_APP_API_SEARCH=http://localhost:5000/api/search
ENV REACT_APP_API_SEARCH_CREATE=http://localhost:5000/api/search/create
ENV REACT_APP_API_SEARCH_DELETE=http://localhost:5000/api/search/delete
ENV REACT_APP_API_ITEMS_DELETE=http://localhost:5000/api/items/delete
ENV REACT_APP_API_SCRAP=http://localhost:5001/task

RUN npm run build


FROM nginx

COPY --from=build /jump-frontend/build /usr/share/nginx/html