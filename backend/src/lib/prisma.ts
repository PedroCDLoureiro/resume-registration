import 'dotenv/config';

import { PrismaMssql } from '@prisma/adapter-mssql';
import { PrismaClient } from '../generated/prisma/client';

const server = process.env.DB_SERVER;
const port = Number(process.env.DB_PORT ?? 1433);
const database = process.env.DB_NAME;
const userName = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

if (!server || !database || !userName || !password) {
    throw new Error('Variáveis de ambiente do banco de dados não configuradas.');
}

if (Number.isNaN(port)) {
    throw new Error('DB_PORT deve ser um número válido.');
}

const adapter = new PrismaMssql({
    server,
    port,
    database,

    authentication: {
        type: 'default',
        options: {
            userName,
            password,
        },
    },

    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
});

export const prisma = new PrismaClient({
    adapter,
});
