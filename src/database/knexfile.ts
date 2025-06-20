import * as dotenv from 'dotenv';
import type { Knex } from 'knex';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface ExtendedConnectionOptions extends Knex.PgConnectionConfig {
    ssl?: {
        rejectUnauthorized: boolean;
        require?: boolean;
    };
}

const config: { [key: string]: Knex.Config } = {
    development: {
        debug: true,
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432', 10),
            user: process.env.DB_USER,
            password: String(process.env.DB_PASSWORD),
            database: process.env.DB_NAME,
            ssl: {
                rejectUnauthorized: false,
                require: true,
            },
        } as ExtendedConnectionOptions,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path.join(__dirname, './migrations/v1'),
            extension: 'ts',
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: path.join(__dirname, './seeds'),
            extension: 'ts',
        },
    },
    production: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432', 10),
            user: process.env.DB_USER,
            password: String(process.env.DB_PASSWORD),
            database: process.env.DB_NAME,
            ssl: {
                rejectUnauthorized: false,
                require: true,
            },
        } as ExtendedConnectionOptions,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path.join(__dirname, './migrations/v1'),
            extension: 'js',
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: path.join(__dirname, './seeds'),
            extension: 'js',
        },
    },
};

// Knex instance yaratmaslik - faqat config export qilish
export default config;
