import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate';


const prisma = new PrismaClient({
  log: ["info"],
}).$extends(withAccelerate());
//
// if (!global.prisma) {
//   global.prisma = new PrismaClient({
//     log: ["info"],
//   }).$extends(withAccelerate());
// }
// prisma = global.prisma;

export default prisma;