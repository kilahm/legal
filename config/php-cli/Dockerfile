FROM php:7-alpine

RUN apk add --update --no-cache postgresql-dev autoconf gcc g++ make\
    && pecl install xdebug \
    && docker-php-ext-install pdo_pgsql \
    && docker-php-ext-enable xdebug \
    && apk del autoconf gcc g++ make \
    && rm -rf /var/cache/apk/*

ADD php.ini /usr/local/etc/php/php.ini
