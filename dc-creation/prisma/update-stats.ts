import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.homepageContent.update({
    where: { id: 1 },
    data: {
      stats: JSON.stringify([
        { label: 'Happy Clients', value: 150 },
        { label: 'Projects Done', value: 320 },
        { label: 'Awards Won', value: 12 },
        { label: 'Years Experience', value: 5 },
      ]),
    },
  });
  console.log('Stats updated.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());