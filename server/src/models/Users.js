import mongoose from "mongoose";

const questionAnsweredSchema = new mongoose.Schema({
  correct: { type: mongoose.Schema.Types.ObjectId, ref: "questions" },
  incorrect: { type: mongoose.Schema.Types.ObjectID, ref: "questions" },
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
