import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaClient = new PrismaClient({
  log: ["query"],
}).$extends(withAccelerate());

export const prisma = prismaClient;
