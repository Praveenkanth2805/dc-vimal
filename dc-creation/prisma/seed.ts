import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL!;
  const adminPassword = process.env.ADMIN_PASSWORD!;
  const adminName = process.env.ADMIN_NAME!;

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Admin user
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: adminName,
    },
  });

  // Homepage content (only one upsert, with stats)
  await prisma.homepageContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      heroTitle: 'Where Art Meets Emotion',
      heroSubtitle: 'Capturing timeless moments with creativity & precision.',
      aboutText: 'DC Creation is a professional photography studio...',
      whyChooseUs: JSON.stringify([
        'Professional & Creative Team',
        'High-Quality Equipment',
        'Affordable Pricing',
        'Drone Coverage Available',
        'Online & On-site Services',
        'Appointment-Based Personalized Service',
      ]),
      stats: JSON.stringify([
        { label: 'Happy Clients', value: 150 },
        { label: 'Projects Done', value: 320 },
        { label: 'Awards Won', value: 12 },
        { label: 'Years Experience', value: 5 },
      ]),
    },
  });

  // Portfolio (skipDuplicates to avoid errors on re-seed)
  await prisma.portfolio.createMany({
    data: [
      { title: 'Wedding Bliss', category: 'Wedding', imageUrl: '/placeholder-wedding.jpg', order: 1 },
      { title: 'Candid Laughter', category: 'Candid', imageUrl: '/placeholder-candid.jpg', order: 2 },
    ],
   // skipDuplicates: true,
  });

  // Photo frame prices
  const prices = [
    { size: '6x4', type: 'Standard', price: 120 },
    { size: '8x6', type: 'Standard', price: 230 },
    { size: '12x8', type: '1-inch Frame', price: 480 },
    { size: '12x8', type: '1-inch Oil Painting Finish', price: 550 },
    { size: '12x12', type: '1-inch Frame', price: 380 },
    { size: '12x12', type: 'Oil Painting Finish', price: 450 },
    { size: '12x18', type: '1-inch Frame', price: 600 },
    { size: '12x18', type: 'Oil Painting Finish', price: 900 },
    { size: '12x24', type: '1-inch Frame', price: 700 },
    { size: '12x24', type: 'Premium Frame', price: 850 },
    { size: '18x24', type: '1-inch Frame', price: 900 },
    { size: '20x16', type: '1-inch Frame', price: 1400 },
    { size: '24x24', type: '1-inch Frame', price: 1200 },
    { size: '24x36', type: '2-inch Frame', price: 1600 },
    { size: '24x36', type: '3-inch Frame', price: 2200 },
  ];

  for (const p of prices) {
    await prisma.photoFramePrice.create({ data: p });
  }

  console.log(`
====================================
✅ Database Seed Completed Successfully
👤 Admin User Created/Updated
🏠 Homepage Content Seeded (with statistics)
🖼️ Portfolio Seeded
🖼️ Photo Frame Prices Seeded
====================================
`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });