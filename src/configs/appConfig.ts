const config = {
  PORT: process.env.PORT || 3000,
  POSTGRES_USER: process.env.POSTGRES_USER || 'postgres',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'POST5432',
  POSTGRES_URL: process.env.POSTGRES_URL || '127.0.0.1',
  POSTGRES_DB: process.env.POSTGRES_DB || '5432/devdb',
  DEV: process.env.DEV || true,
  SALT_ROUNDS: process.env.DEV || 10
};

export default config;
