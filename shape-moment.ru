# HTTP → HTTPS
server {
    listen 80;
    server_name shape-moment-rule www.shape-moment.ru ;

    # редиректим на HTTPS
    return 301 https://$host$request_uri;
}

# HTTPS конфигурация
server {
    listen 443 ssl http2;
    server_name shape-moment.ru  www.shape-moment.ru   ;

    root /usr/share/nginx/html/shape-moment; 
    index index.html;

    ssl_certificate     /etc/letsencrypt/live/shape-moment.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/shape-moment.ru/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;

    # Безопасность
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location ~* \.(?:js|css|woff2?|ttf|glb|gltf|bin|eot|otf|svg|ico|jpg|jpeg|png|gif|webp|avif|mp4|webm|ogg|json|wasm)$ {
        access_log off;
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    error_page 404 /404.html;
}