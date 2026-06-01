-- Run this with a PostgreSQL admin user if the database does not exist yet.
-- Easiest option: use pgAdmin and run only the CREATE DATABASE line.

CREATE DATABASE asset;

-- Optional: create a dedicated application user instead of using postgres.
-- Run as a PostgreSQL admin user:
-- CREATE USER asset_user WITH PASSWORD 'your_strong_password';
-- GRANT ALL PRIVILEGES ON DATABASE asset TO asset_user;

-- Then connect to the asset database and run:
-- GRANT ALL ON SCHEMA public TO asset_user;
-- ALTER SCHEMA public OWNER TO asset_user;
