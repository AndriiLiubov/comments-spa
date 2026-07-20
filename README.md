# Comments SPA

A full-stack single-page application for nested comments built with Django REST Framework and React.

## Features

- Nested comments with unlimited depth
- Reply to comments
- Pagination (25 comments per page)
- Sorting by username, email and creation date
- CAPTCHA protection
- Live HTML preview
- Safe HTML sanitization (Bleach)
- HTML toolbar (i, strong, code, links)
- Image upload with automatic resize (320×240)
- TXT file upload (100 KB limit)
- Lightbox image preview
- Client-side and server-side validation
- PostgreSQL
- Docker & Docker Compose
- Nginx reverse proxy

## Tech Stack

### Backend

- Django 6
- Django REST Framework
- PostgreSQL
- Pillow
- Bleach

### Frontend

- React
- Axios

### Infrastructure

- Docker
- Docker Compose
- Nginx

## Project Structure

```
backend/
frontend/
database/
nginx/
docker-compose.yml
```

## Run with Docker

```bash
git clone <repo>

cd comments-spa

docker compose up --build
```

Application:

```
http://localhost
```

## Local Development

Backend

```bash
cd backend

python manage.py migrate

python manage.py runserver
```

Frontend

```bash
cd frontend

npm install

npm run dev
```

## API

```
GET /api/comments/

POST /api/comments/

GET /api/comments/captcha/
```

## Implemented Requirements

- Django REST API
- React SPA
- Nested comments
- HTML preview
- CAPTCHA
- Pagination
- Sorting
- File validation
- Image resize
- XSS protection
- Docker
- PostgreSQL
- Nginx
