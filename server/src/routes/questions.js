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

// create new question (must be logged in)
router.post("/:id", verifyToken, async (req, res) => {
  const question = new QuestionModel(req.body);
  console.log("the id" + question._id);
  try {
    await UserModel.findOneAndUpdate(
      { _id: id },
      { $push: { userOwner: question._id } }
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
