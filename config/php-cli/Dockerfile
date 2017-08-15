FROM php:7-alpine

RUN apk add --update --no-cache postgresql-dev \
    && docker-php-ext-install pdo_pgsql \
    && rm -rf /var/cache/apk/*

ADD php.ini /usr/local/etc/php/php.ini
