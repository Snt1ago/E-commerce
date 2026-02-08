process.env.DATABASE_URL = "file:./dev.db";
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Connecting to database...');
    // Clean up existing test user
    await prisma.user.deleteMany({
      where: { email: 'test@example.com' } 
    });

    console.log('Creating test user...');
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword123',
      },
    });
    console.log('User created:', user);

    const fetchedUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' },
    });
    console.log('Fetched user:', fetchedUser);

    if (fetchedUser && fetchedUser.id === user.id) {
        console.log('Verification SUCCESS');
    } else {
        console.log('Verification FAILED');
    }

  } catch (e) {
    console.error('Error:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
