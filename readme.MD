<a name="readme-top"></a>

# Nest Clean - A project using Nest, DDD, TDD and Clean Architecture

## Getting Started

1. Make sure **Git** and **NodeJS** is installed.
2. Clone this repository to your local computer.
3. Create `.env` file in root directory like this (see file `env.ts`):
```bash
# Auth (JWT)
JWT_PUBLIC_KEY=""
JWT_PRIVATE_KEY=""

# Prisma (Database)
DATABASE_URL="postgresql://postgres:docker@localhost:5432/nest-clean?schema=public"
PORT="3333"
# redis | localhost
REDIS_HOST="redis"

# Upload (AWS / Cloudflare)
CLOUDFLARE_ACCOUNT_ID="ddccb506e0ca8c8eaa1exxxxxxxxxxxx"

AWS_BUCKET_NAME="ignite-nest-clean"
AWS_ACCESS_KEY_ID="331781dc741e2a72xxxxxxxxxxxxxx"
AWS_SECRET_ACCESS_KEY="aa5dfd71be6555e7dcef7e660c8a8e7xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```
I decided to use RS256 strategy, so for you generate your private and public keys you can run:
1. openssl genpkey -algorithm RSA -aes256 -out private_key.pem
2. openssl rsa -pubout -in private_key.pem -out public_key.pem
3. base64 -w 0 public_key.pem > public_key.txt
4. base64 -w 0 private_key.pem > private_key.txt

*Obs.: You'll need to install openssl. The public and private key will be on the txt file.*

**NOTE:** You can get easily the other variables on Cloudflare R2, you just need create a bucket.

## Running
You can run the local using:
1. pnpm install
2. pnpm start:dev

Or using docker `docker compose up --build -d`


