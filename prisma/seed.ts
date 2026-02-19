import { prisma } from "../src/shared/prisma"

async function main() {

    await prisma.waterFountain.create({
      data: {
        name: "Principal",
        location: "Mucambinho",
        waterConsumptions: {
          create: [
            { volume: 1 },
            { volume: 10 },
            { volume: 5 },
            { volume: 9 },
          ]
        },
        waterTemperatures: {
          create: [
            { temperature: 22 },
            { temperature: 21 },
            { temperature: 20 },
            { temperature: 25 },
          ]
        },
        filterChanges: {
          create: [
            { createdAt:new Date("1997") }
          ]
        }
      }
    });

    await prisma.waterFountain.create({
      data: {
        name: "Cantina",
        location: "Psicologia",
        waterConsumptions: {
          create: [
            { volume: 1 },
            { volume: 10 },
            { volume: 5 },
            { volume: 9 },
          ]
        },
        waterTemperatures: {
          create: [
            { temperature: 22 },
            { temperature: 21 },
            { temperature: 20 },
            { temperature: 25 },
          ]
        },
        filterChanges: {
          create: [
            { createdAt:new Date("1997") }
          ]
        }
      }
    });

    await prisma.waterFountain.create({
      data: {
        name: "Laboratório",
        location: "Odontologia",
        waterConsumptions: {
          create: [
            { volume: 1 },
            { volume: 10 },
            { volume: 5 },
            { volume: 9 },
          ]
        },
        waterTemperatures: {
          create: [
            { temperature: 22 },
            { temperature: 21 },
            { temperature: 20 },
            { temperature: 25 },
          ]
        },
        filterChanges: {
          create: [
            { createdAt: new Date("1997") }
          ]
        }
      }
    });

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