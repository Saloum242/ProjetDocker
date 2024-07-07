# Étape 1: Build de l'application Angular
FROM node:alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Étape 2: Nginx pour servir l'application
FROM nginx:alpine
COPY --from=build /app/dist/angular-esgi-form-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]