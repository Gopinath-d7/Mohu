const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

if (!process.env.DATABASE_URL) {
  console.error("❌ Error: DATABASE_URL is missing from your .env file!");
  process.exit(1);
}

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🔄 Connecting to Neon cloud database...");

  await prisma.product.deleteMany({});
  console.log("🗑️ Cleared existing table records.");

  await prisma.product.createMany({
    data: [
      {
        name: "Minimalist Leather Backpack",
        description: "Water-resistant premium leather backpack with a dedicated laptop compartment.",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80",
        stock: 15,
      },
      {
        name: "Wireless Noise-Cancelling Headphones",
        description: "Immersive audio experience with up to 40 hours of continuous playback.",
        price: 249.50,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
        stock: 8,
      },
      {
        name: "Mechanical Ergonomic Keyboard",
        description: "Tactile brown switches with customizable RGB lighting profiles.",
        price: 89.00,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
        stock: 22,
      },
    ],
  });

  console.log("✅ Database seeded successfully with test items!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed with error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });