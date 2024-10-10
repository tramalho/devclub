import express from "express";
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";
import auth from "./middlewares/auth.js";

const app = express();
app.use(express.json());

app.use("/", publicRoutes);
app.use("/", auth, privateRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
