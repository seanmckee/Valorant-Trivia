import express from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import { userRouter } from "./routes/users.js";
import { questionsRouter } from "./routes/questions.js";
import { userInfoRouter } from "./routes/user.js";

// import { questionRouter } from "./routes/questions.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/questions", questionsRouter);
app.use("/user", userInfoRouter);

mongoose.connect(
  "mongodb+srv://seanmckee:Killjoy100@valorant-trivia.qasvmxx.mongodb.net/?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("SERVER STARTED"));
