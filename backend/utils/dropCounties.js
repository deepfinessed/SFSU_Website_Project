import Prisma from '@prisma/client';

const {PrismaClient} = Prisma;

const prisma = new PrismaClient();

await prisma.$executeRaw('DROP TABLE Counties');

setTimeout(() => process.exit(), 5000);
