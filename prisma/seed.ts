import {
  PrismaClient,
  ProjectStatus,
  ShotType,
  MediaType,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.media.deleteMany();
  await prisma.shot.deleteMany();
  await prisma.project.deleteMany();
  // 1. Create demo user
  const user = await prisma.user.upsert({
    where: { email: "demo@droneflow.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@droneflow.com",
      passwordHash: "demo", // later replace with real hash
    },
  });

  // 2. Create projects
  await prisma.project.create({
    data: {
      title: "Luxury Villa Shoot",
      slug: "luxury-villa-shoot",
      location: "Dublin, Ireland",
      description: "High-end real estate drone shoot",
      shootDate: new Date(),
      status: ProjectStatus.planned,
      userId: user.id,

      shots: {
        create: [
          {
            title: "Front reveal",
            type: ShotType.reveal,
            order: 1,
          },
          {
            title: "Top down view",
            type: ShotType.top_down,
            order: 2,
          },
        ],
      },

      media: {
        create: [
          {
            type: MediaType.image,
            url: "https://placehold.co/600x400",
          },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: "Beach Resort Promo",
      slug: "beach-resort-promo",
      location: "Malaga, Spain",
      description: "Promo video for resort",
      status: ProjectStatus.editing,
      userId: user.id,

      shots: {
        create: [
          {
            title: "Orbit around building",
            type: ShotType.orbit,
            order: 1,
          },
        ],
      },

      media: {
        create: [
          {
            type: MediaType.video,
            url: "https://example.com/video.mp4",
            isBestShot: true,
          },
        ],
      },
    },
  });

  console.log("Seed completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
