import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  name: String,
  votes: Number,
});

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  //   answers: [{ type: String, votes: Number, required: true }],
  //   answers: [answerSchema],
  answers: [answerSchema],
  voted: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const QuestionModel = mongoose.model("questions", QuestionSchema);

answers: [];
