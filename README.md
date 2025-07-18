# 🔒 OTP Authentication Service with NestJS and MongoDB

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

A secure and scalable authentication microservice featuring phone verification via OTP, JWT-based sessions, and MongoDB storage.

## Table of Contents

- [Why MongoDB?](#-why-mongodb)
- [Quick Start](#-quick-start)
  - [With Docker](#with-docker-recommended)
- [APIs](#-api-documentation)

## Why MongoDB?

| Feature          | Benefit for Auth Systems            |
| ---------------- | ----------------------------------- |
| Flexible Schema  | Store varying user profiles easily  |
| Fast Development | No migrations needed for OTP fields |

## 🚀 Quick Start

### With Docker (Recommended)

```bash
# 1. Clone and setup
git clone https://github.com/your-repo/otp-auth.git
cd otp-auth
cp .env.example .env

# 2. Edit configuration (nano/vim)
nano .env

# 3. Start services
docker-compose up -d --build

# 4. Access:
# - API: http://localhost:3000
# - Swagger: http://localhost:3000/api
```

## APIs

```mermaid
sequenceDiagram
    POST /auth/register: register new user and send otp code for entered phone
    POST /auth/verify-otp: get phone and otp and verify if its ok
```
