import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatarUrl: "https://avatars.dicebear.com/api/adventurer/john-doe.svg",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "example pool",
      code: "BOL123",
      ownerId: user.id,

      Participant: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-24T11:00:00.000Z",
      firstTeamCountryCode: "DE",
      seconfTeamCountryCode: "BR",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-25T11:00:00.000Z",
      firstTeamCountryCode: "BR",
      seconfTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoint: 2,
          secondeTeamPoint: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
