import express from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import { userRouter } from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

mongoose.connect(
  "mongodb+srv://seanmckee:Killjoy100@valorant-trivia.qasvmxx.mongodb.net/?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("SERVER STARTED"));
