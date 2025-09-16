import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 테스트용 사용자 생성
  const testUser = await prisma.user.create({
    data: {
      code: '123456',
      name: '관리자1',
      account: '123-456-789',
    },
  });

  console.log('테스트 사용자 생성됨:', testUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
