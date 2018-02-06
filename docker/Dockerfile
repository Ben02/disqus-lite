FROM romeoz/docker-nginx-php

COPY ./conf/disqus.txt /etc/nginx/disqus.txt
COPY ./php/post/index.php /var/www/app/post/index.php

RUN sed -i '/charset utf8;/ r /etc/nginx/disqus.txt' /etc/nginx/sites-enabled/app.conf \
    && sed -i '/http {/ a resolver 8.8.8.8;' /etc/nginx/nginx.conf \
    && rm -rf /etc/nginx/disqus.txt

WORKDIR /var/www/app/

EXPOSE 80 443

CMD ["/usr/bin/supervisord"]
