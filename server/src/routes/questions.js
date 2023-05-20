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
  // console.log(req.params.id);
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

// router.get("/user-voted/:userID", verifyToken, async (req, res) => {

// })

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
router.put("/:questionID/:userID/:answerSelection", async (req, res) => {
  const question = await QuestionModel.findById(req.params.questionID);
  const user = await UserModel.findById(req.params.userID);
  // console.log(req.params.answerSelection + " " + question.correctAnswerIndex);
  try {
    if (question.correctAnswerIndex == req.params.answerSelection) {
      await UserModel.findOneAndUpdate(
        { _id: req.params.userID },
        {
          $inc: { correctlyAnswered: 1 },
          $push: {
            questionsVoted: {
              question: req.params.questionID,
              correct: true,
              votedIndex: req.params.answerSelection,
            },
          },
        }
      );
      await QuestionModel.findOneAndUpdate(
        { _id: req.params.questionID },
        {
          $inc: { correctlyAnswered: 1 },
          $inc: {
            [`answers.${req.params.answerSelection}.votes`]: 1,
          },
          $push: { voted: req.params.userID },
        }
      );
    } else {
      await UserModel.findOneAndUpdate(
        { _id: req.params.userID },
        {
          $inc: { incorrectlyAnswered: 1 },
          $push: {
            questionsVoted: {
              question: req.params.questionID,
              correct: false,
              votedIndex: req.params.answerSelection,
            },
          },
        }
      );
      await QuestionModel.findOneAndUpdate(
        { _id: req.params.questionID },
        {
          $inc: { incorrectlyAnswered: 1 },
          $inc: { [`answers.${req.params.answerSelection}.votes`]: 1 },
          $push: { voted: req.params.userID },
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
});

export { router as questionsRouter };
