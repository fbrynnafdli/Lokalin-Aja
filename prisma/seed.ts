// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient() // <--- Bersih, gak perlu config aneh-aneh

async function main() {
  console.log('🌱 Mulai seeding...')

  // 1. Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lokalin.com' },
    update: {},
    create: {
      email: 'admin@lokalin.com',
      name: 'Admin Ganteng',
      role: 'ADMIN',
      password: 'admin123',
    },
  })
  console.log('👤 Admin:', admin.email)

  // 2. Mitra
  const mitra = await prisma.user.upsert({
    where: { email: 'mitra@sore.com' },
    update: {},
    create: {
      email: 'mitra@sore.com',
      name: 'Pemilik Sore Space',
      role: 'MITRA',
      password: 'mitra123',
    },
  })
  console.log('🏪 Mitra:', mitra.email)

  // 3. Member
  const member = await prisma.user.upsert({
    where: { email: 'member@gmail.com' },
    update: {},
    create: {
      email: 'member@gmail.com',
      name: 'Anak Nongkrong',
      role: 'MEMBER',
      password: 'member123',
    },
  })
  console.log('🙋‍♂️ Member:', member.email)

  // 4. Tempat Dummy
  const existingPlace = await prisma.place.findFirst({
    where: { name: 'Sore Space' }
  })

  if (!existingPlace) {
    await prisma.place.create({
      data: {
        name: 'Sore Space',
        category: 'Ngops',
        address: 'Sumedang',
        description: 'Tempat asik',
        status: 'APPROVED',
        createdById: mitra.id,
        ownerId: mitra.id,
        images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop'],
      },
    })
    console.log('📍 Place created: Sore Space')
  }

  console.log('✅ Seeding BERHASIL!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })