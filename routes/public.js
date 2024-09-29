import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const router = express.Router();

// console.log("### process.env ###");
// console.log(process.env.DB_USERNAME);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_URL);

// const completeUrl = process.env.DB_URL.replace("<DB_USERNAME>", process.env.DB_USERNAME)
// .replace("<DB_PASSWORD>", process.env.DB_PASSWORD).replace("<DB_NAME>", process.env.DB_NAME);

// console.log(`\n ${completeUrl}`);

// console.log("###################");

router.get("/users", async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error, try again" });
  }
});

router.post("/user", async (req, res) => {
  try {
    const user = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const userSaved = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    res.status(201).json(userSaved);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error, try again" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = req.body;

    const userSearched = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!userSearched) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userSearched);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error, try again" });
  }
});

Request.prototype.catchError = (error) => {
  console.log(error);
  res.status(500).json({ message: "Internal Server Error, try again" });
};

export default router;
