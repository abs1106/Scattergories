git "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("./generated/prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
//allows uses of different libraries 
const adapter = new adapter_pg_1.PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new client_1.PrismaClient({ adapter });
(async () => {
    console.log('Prisma Client connected');
    const cities = await prisma.cities.findMany();
    console.log('Cities:', cities);
    await prisma.$disconnect();
})();
