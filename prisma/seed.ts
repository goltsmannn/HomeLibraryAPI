import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Users
  const user = await prisma.user.upsert({
    where: { login: 'john_doe' },
    create: {
      login: 'john_doe',
      password: 'hashed_password_here', // Use a hashed password here in production
      version: 1,
    },
    update: {}
  })

  console.log(`User created: ${user.login}`)

  // Create Artists
  const artist = await prisma.artist.create({
    data: {
      name: 'The Beatles',
      grammy: true,
    },
  })

  console.log(`Artist created: ${artist.name}`)

  // Create Albums
  const album = await prisma.album.create({
    data: {
      name: 'Abbey Road',
      year: 1969,
      artistId: artist.id,
    },
  })

  console.log(`Album created: ${album.name}`)

  // Create Tracks
  const track = await prisma.track.create({
    data: {
      name: 'Come Together',
      duration: 260, // Duration in seconds
      artistId: artist.id,
      albumId: album.id,
    },
  })

  console.log(`Track created: ${track.name}`)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })