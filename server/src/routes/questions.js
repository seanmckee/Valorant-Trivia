import express from "express";
import mongoose from "mongoose";
import { QuestionModel } from "../models/Questions.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

// get all questions in db
router.get("/", async (req, res) => {
  try {
    const response = await QuestionModel.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// get user's created questions
router.get("/:id", async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    res.status(404).send("Link Not Found - invalid id");
  }
  console.log(req.params.id);
  const questions = user.questions;

  try {
    const response = [];
    for (let i = 0; i < questions.length; i++) {
      const question = await QuestionModel.findById(questions[i]);
      response.push(question);
    }
    res.json(response);
  } catch (error) {
    console.error(error);
  }
});

// create new question (must be logged in)
router.post("/:id", verifyToken, async (req, res) => {
  const question = new QuestionModel(req.body);
  // console.log(UserModel.findOne({ id }));
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { questions: question._id } }
    );
    const response = await question.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// updates question with vote

router.put("/:id", verifyToken, async (req, res) => {
  const question = await QuestionModel.findById(req.params.id);
});

export { router as questionsRouter };
