# IT Asset Management System - Backend

NestJS backend configured for **PostgreSQL**, JWT auth, organization login, user login, users, assets, assignments, returns, materials and dashboard reports.

## Why PostgreSQL connection was failing

The project must use `type: 'postgres'` with the `pg` driver. I have updated the backend to PostgreSQL and removed MySQL-specific column types like `longtext` and `datetime` from entities.

## Setup

```bash
cd asset_backend-main
npm install
copy .env.example .env
```

Update `.env`:

```env
PORT=5000
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_postgres_password
DB_NAME=asset
DB_SYNC=true
JWT_SECRET=change_this_secret_key
FRONTEND_URL=http://localhost:5173
```

> Use `DB_USER=postgres` unless you have manually created a PostgreSQL user named `root`.

Create the database in pgAdmin or psql:

```sql
CREATE DATABASE asset;
```

Check PostgreSQL connection before starting Nest:

```bash
npm run db:check
```

Start backend:

```bash
npm run start:dev
```

Health checks:

```txt
GET http://localhost:5000/api/health
GET http://localhost:5000/api/health/database
```

Register first organization:

```bash
curl -X POST http://localhost:5000/api/organizations/register ^
  -H "Content-Type: application/json" ^
  -d "{"organizationName":"Hero Steels","email":"admin@herosteels.com","phone":"9999999999","address":"India","password":"123456"}"
```

Login from frontend with Organization mode:

```txt
Email: admin@herosteels.com
Password: 123456
```
