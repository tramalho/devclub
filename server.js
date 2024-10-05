import express from "express";
import publicRoutes from "./routes/public.js";

const app = express();
app.use(express.json());

app.use("/", publicRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
