# Развертывание проекта на VDS (Ubuntu/Debian)

Этот проект подготовлен для развертывания на собственном сервере (VDS). Ниже приведена инструкция по настройке.

## Предварительные требования

На сервере должны быть установлены:
- **Node.js** (версия 20 или выше)
- **npm** (обычно идет вместе с Node.js)
- **Git**
- **PM2** (менеджер процессов для Node.js)
- **Nginx** (веб-сервер для проксирования запросов)

## Шаг 1: Подготовка сервера

1. Обновите пакеты:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. Установите Node.js (через nvm или напрямую):
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Установите PM2 глобально:
   ```bash
   sudo npm install -g pm2
   ```

4. Установите Nginx:
   ```bash
   sudo apt install nginx
   ```

## Шаг 2: Загрузка проекта

1. Клонируйте репозиторий:
   ```bash
   git clone <ваша-ссылка-на-репозиторий>
   cd alpha-site
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Создайте файл `.env.local` (если нужны переменные окружения):
   ```bash
   touch .env.local
   # Добавьте необходимые ключи, например:
   # NEXT_PUBLIC_BASE_PATH=""
   ```

## Шаг 3: Сборка и запуск

1. Соберите проект:
   ```bash
   npm run build
   ```

2. Запустите проект через PM2:
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

   Теперь приложение работает на порту 3000.

## Шаг 4: Настройка Nginx

1. Создайте конфиг для сайта:
   ```bash
   sudo nano /etc/nginx/sites-available/alpha-site
   ```

2. Вставьте следующую конфигурацию (замените `your-domain.com` на ваш домен или IP):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. Активируйте сайт и перезагрузите Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/alpha-site /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Дополнительно: HTTPS (SSL)

Для получения бесплатного SSL-сертификата используйте Certbot:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Обновление проекта

Чтобы обновить код на сервере:

```bash
git pull
npm install
npm run build
pm2 restart alpha-site
```
