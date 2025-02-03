import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate';


let prisma: PrismaClient;

if (!global.prisma) {
  global.prisma = new PrismaClient({
    log: ["info"],
  }).$extends(withAccelerate());
}
prisma = global.prisma;

export default prisma;