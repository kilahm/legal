FROM alpine:3.7

#
# PACKAGES
#
COPY entrypoint.sh /opt/docker-entrypoint.sh
COPY config.nginx /nginx/nginx.conf
RUN apk add --no-cache \
            bash \
            nginx \
            shadow \
            openssl && \
            chmod u+rx,g+rx,o+rx,a-w /opt/docker-entrypoint.sh && \
            usermod -u 10777 nginx && \
            groupmod -g 10777 nginx && \
            mkdir -p /opt/ssl && \
            mkdir -p /app/public && \
            mkdir -p /nginx/tmp/ && \
            chown -R nginx:nginx \
              /opt/ \
              /nginx/ \
              /var/lib/nginx \
              /var/log/nginx \
              /app/public

#
# RUN NGINX
#
USER nginx
EXPOSE 4443
WORKDIR /app/public
ENTRYPOINT ["/opt/docker-entrypoint.sh"]
CMD ["nginx", "-c", "/nginx/nginx.conf", "-g", "daemon off;"]
