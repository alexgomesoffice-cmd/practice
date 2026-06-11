import "dotenv/config"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from "../generated/prisma/client"

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding categories...")

  await prisma.category.createMany({
    data: [
      { name: "Tech" },
      { name: "Travel" },
      { name: "Food" },
      { name: "Lifestyle" },
      { name: "Education" },
    ],
    skipDuplicates: true, // safe if you run again
  })

  console.log("Seeding completed successfully!")
}
main().then(() => {
  console.log("All done!")
  process.exit(0)
}).catch((error) => {
  console.error("Error seeding data:", error)
  process.exit(1)
})