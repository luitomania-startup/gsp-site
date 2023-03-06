FROM node as build
WORKDIR /app
COPY . /app
RUN yarn
RUN yarn build

# FROM nginx
# COPY --from=build /app/dist /var/www/html/
# COPY --from=build /app/express.conf /etc/nginx/sites-enabled/
# # RUN rm /etc/nginx/sites-enabled/default; systemctl restart nginx; ufw allow 80/tcp
# EXPOSE 80
# CMD ["nginx","-g","daemon off;"]

FROM nginx
RUN rm -rf /etc/nginx/sites-enabled/default
COPY --from=build /app/dist/ /usr/share/nginx/html/
COPY --from=build /app/express.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]