import "dotenv/config";
import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import { faker } from "@faker-js/faker";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });


async function main() {
  for (let i = 0; i < 10; i++) {
    await prisma.cities.create({
      data: {
        name: faker.location.city(),
        state: faker.location.state({ abbreviated: true }),
      },
    });
  }

  console.log("✅ Added 10 cities");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
