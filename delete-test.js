const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const deleted = await prisma.problem.deleteMany({
    where: { title: { startsWith: 'test' } }
  });
  console.log('Deleted', deleted.count, 'problems');
}

run().catch(console.error).finally(() => prisma.$disconnect());
