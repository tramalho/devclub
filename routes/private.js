import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
});

router.get("/users", async (req, res) => {
  try {
    let filterConditions = {};
    if (req.query) {
      filterConditions = {
        name: {
          contains: req.query.name,
        },
        age: req.query.age,
        email: req.query.email,
      };
    }

    const allUsers = await prisma.user.findMany({
      where: filterConditions,
      orderBy: { name: "asc" },
    });
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error, try again" });
  }
});

export default router;
