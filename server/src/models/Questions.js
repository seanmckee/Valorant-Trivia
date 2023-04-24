import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  votes: Number,
});

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  //   answers: [{ type: String, votes: Number, required: true }],
  answers: [answerSchema],
  voted: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const QuestionModel = mongoose.model("questions", QuestionSchema);
