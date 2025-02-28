import { prisma } from "../src/utils/prisma";

const uuid_setup = async () => {
    const result = await prisma.$queryRaw`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
    
    console.log("==================uuid setup made with result:", result)
}

uuid_setup()

console.log("making setup")