server {
    listen 80;
    server_name kirill-starkov.ru www.kirill-starkov.ru;

    # редиректим на HTTPS
    return 301 https://$host$request_uri;
}

# HTTPS конфигурация
server {
    listen 443 ssl http2;
    server_name kirill-starkov.ru www.kirill-starkov.ru;

    root /usr/share/nginx/html/resume; 
    index index.html;

    ssl_certificate     /etc/letsencrypt/live/kirill-starkov.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kirill-starkov.ru/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;


    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;


    location /api/ {
        proxy_pass http://127.0.0.1:8000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

        location /static/ {
    root /var/www/static/resume/;
    }
    location /static/ {
        alias /var/www/static/resume/;
        access_log off;
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files $uri $uri/ =404;
    }

    location ~* \.(?:js|css|woff2?|ttf|glb|gltf|bin|eot|otf|svg|ico|jpg|jpeg|png|gif|webp|avif|mp4|webm|ogg|json|wasm)$ {
        access_log off;
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files $uri $uri/ =404;
    }

    error_page 404 /404.html;
}