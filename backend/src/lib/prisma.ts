import 'dotenv/config';

import { PrismaClient } from '../generated/prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';

const adapter = new PrismaMssql({
    server: 'DESKTOP-AF71I7O',
    port: 1433,
    database: 'ResumeRegistration',

    authentication: {
        type: 'default',
        options: {
            userName: 'resume_app',
            password: 'Resume@123456',
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
