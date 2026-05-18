import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  // 1. Double check that the string exists
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing from environment variables.");
  }

  // 2. Initialize the raw pg connection pool
  const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL 
  });

  // 3. Bind the pool instance to Prisma's driver adapter
  const adapter = new PrismaPg(pool);

  // 4. Return the client with the adapter attached
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}