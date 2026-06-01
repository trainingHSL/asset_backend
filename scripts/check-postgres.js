const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return {};
  return fs.readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.trim().startsWith('#'))
    .reduce((acc, line) => {
      const idx = line.indexOf('=');
      if (idx === -1) return acc;
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      acc[key] = value;
      return acc;
    }, {});
}

async function main() {
  const env = { ...loadEnv(), ...process.env };
  const client = new Client({
    host: env.DB_HOST || '127.0.0.1',
    port: Number(env.DB_PORT || 5432),
    user: env.DB_USER || 'postgres',
    password: env.DB_PASS || '',
    database: env.DB_NAME || 'asset',
    connectionTimeoutMillis: Number(env.DB_CONNECTION_TIMEOUT || 10000),
  });

  console.log('Checking PostgreSQL connection...');
  console.log(`Host: ${client.host}`);
  console.log(`Port: ${client.port}`);
  console.log(`User: ${client.user}`);
  console.log(`Database: ${client.database}`);

  try {
    await client.connect();
    const result = await client.query('SELECT current_database() AS database, current_user AS user, version() AS version');
    console.log('✅ PostgreSQL connected successfully.');
    console.log(result.rows[0]);
  } catch (error) {
    console.error('❌ PostgreSQL connection failed.');
    console.error(error.message);
    console.error('\nCheck: PostgreSQL service is running, DB_HOST/DB_PORT are correct, database exists, and DB_USER/DB_PASS are correct.');
    process.exitCode = 1;
  } finally {
    await client.end().catch(() => undefined);
  }
}

main();
