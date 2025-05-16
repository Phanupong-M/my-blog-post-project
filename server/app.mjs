import "dotenv/config";
import express from "express";
import cors from "cors";
import postRouter from "./routes/postRouter.mjs";
import authRouter from "./routes/auth.mjs";
import categoryRouter from "./routes/categoryRouter.mjs";
import profileRouter from "./routes/profileRouter.mjs";

const app = express();
const port = process.env.PORT || 4001;

app.use(cors({
  origin: '*',
}));

app.use(express.json());

app.use("/posts", postRouter)
app.use("/auth", authRouter);
app.use("/categories", categoryRouter);
app.use("/profile", profileRouter);

app.get("/", (req, res) => {
  res.send("Hello TechUp!");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
