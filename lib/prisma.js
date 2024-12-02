import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global;

const prismaClient = new PrismaClient({
  log: ["query"],
});

//Add accelerate extension to prisma to run client on edge server
withAccelerate(prismaClient);

export const prisma = globalForPrisma.prisma || prismaClient;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
