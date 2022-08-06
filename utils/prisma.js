const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

module.exports = {
    prismaClient: prisma,
    connect: async () => {
        await prisma.$connect()
    },
    disconect: async () => {
        await prisma.$disconnect()
    }
}