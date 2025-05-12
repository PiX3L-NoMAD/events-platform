import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Creates a staff user
  const staff = await prisma.user.upsert({
    where: { email: 'staff@example.com' },
    update: {},
    create: {
      email: 'staff@example.com',
      name: 'Staff User',
      role: 'STAFF',
    },
  });

  // Creates sample events
  await prisma.event.createMany({
    data: [
      {
        title: 'Community Clean-Up',
        description: 'Join us to clean the park and surrounding area.',
        location: 'Green Park',
        datetime: new Date(Date.now() + 86400000).toISOString(), // tomorrow
        createdById: staff.id,
      },
      {
        title: 'Board Game Night',
        description: 'Fun and games at the community center!',
        location: 'Community Hall',
        datetime: new Date(Date.now() + 172800000).toISOString(), // day after
        createdById: staff.id,
      },
    ],
  });

  console.log('Seed data created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
