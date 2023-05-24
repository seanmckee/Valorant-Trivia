import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import { userRouter } from "./routes/users.js";
import { questionsRouter } from "./routes/questions.js";
import { userInfoRouter } from "./routes/user.js";

// import { questionRouter } from "./routes/questions.js";

const app = express();
dotenv.config({ path: "./config/.env" });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "https://sprightly-otter-8f8db4.netlify.app/",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", userRouter);
app.use("/questions", questionsRouter);
app.use("/user", userInfoRouter);

mongoose.connect(process.env.Connection);

app.listen(3001, () => console.log("SERVER STARTED"));
