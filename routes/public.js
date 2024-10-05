import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    let where = {};
    if (req.query) {
      where = {
        name: {
          contains: req.query.name,
        },
        age: req.query.age,
        email: req.query.email,
      };
    }

    const allUsers = await prisma.user.findMany({
      where: where,
      select: {
        id: true,
        name: true,
        age: true,
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
        age: user.age,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: `Success created user: ${userSaved.id}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    const user = req.body;

    const userSaved = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: user.name,
        age: user.age,
        email: user.email,
      },
    });

    res.status(201).json({ message: "Success Operation!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    const userDeleted = await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ message: "User Deleted!" });
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

    const isMatch = await bcrypt.compare(user.password, userSearched.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid User or Password" });
    }

    const jwtValue = jwt.sign({ id: userSearched.id }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });

    res.status(200).json(jwtValue);
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
