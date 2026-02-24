import { config } from 'dotenv';
import { z }      from 'zod';

config();

const envSchema = z.object({

    NODE_ENV: z.string(),

    APP_PORT: z.coerce.number(),
    APP_HOST: z.string(),

    CORS_ORIGIN: z.string(),
    
    DATABASE_URL: z.string(),

});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    
  console.error(_env.error);

  throw new Error('Invalid environment variables');

}

export const env = _env.data;