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
app.use(cors());

app.use("/auth", userRouter);
app.use("/questions", questionsRouter);
app.use("/user", userInfoRouter);

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "/client/dist")));
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/client/dist/index.html"))
// );

mongoose.connect(process.env.Connection);

app.listen(3001, () => console.log("SERVER STARTED"));
