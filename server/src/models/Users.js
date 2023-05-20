import mongoose from "mongoose";

const questionAnsweredSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: "questions" },
  correct: { type: Boolean, required: true },
  votedIndex: { type: Number },
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "questions" }],
  questionsVoted: [questionAnsweredSchema],
  correctlyAnswered: { type: Number },
  incorrectlyAnswered: { type: Number },
});

export const UserModel = mongoose.model("users", UserSchema);
