import { config } from 'dotenv';

config();

const { env } = process;

export const pg = {
  host: env.PG_HOST || 'localhost',
  port: env.PG_PORT || 5432,
  user: env.PG_USER || 'postgres',
  password: env.PG_PASSWORD || 'pgpwd',
  database: env.PG_DB_NAME || 'jbs_db',
  migrationsTable: env.PG_MIGRATIONS_TABLE || 'migrations',
  maxPool: 75,
  minPool: 2,
};

export const server = {
  httpPort: env.HTTP_PORT || 4444,
  nodeEnv: env.NODE_ENV || 'development',
  refreshToken: {
    secret: env.REFRESH_TOKEN_SECRET || 'lkjhsdhhbushiudshuishbosobsu',
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN || '365d',
  },
  accessToken: {
    secret: env.ACCESS_TOKEN_SECRET || 'lkjhsdhhbushiudshuishbosobsu',
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN || '365d',
  }
};  

export const Admin = {
   phone_number: env.PHONE_NUMBER || '585488778',
   password: env.PASSWORD || 'superadmin'
}; 


 