// src/db.js
import { PrismaClient } from '../../generated/prisma/index.js'; 
import { PrismaPg } from '@prisma/adapter-pg';
import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();


// 1. Initialize the Connection Pool
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Initialize the Adapter
const adapter = new PrismaPg(pool);

// 3. Initialize Prisma Client with the Adapter and Logging
const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"] // See everything locally
      : ["error"],                 // Only see crashes in production
});

// 4. Test the connection on server startup
const connectDB = async () => {
  try {
    // A simple query to wake up Neon DB and verify the pool is working
    await prisma.$queryRaw`SELECT 1`; 
    console.log("✅ Database Connected Successfully");
  } catch (error) {
    console.error(`❌ Error Connecting to DB: ${error.message}`);
    process.exit(1); // Kill the server if the DB is down
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
};

export { prisma, connectDB, disconnectDB };