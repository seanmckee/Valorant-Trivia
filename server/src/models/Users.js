import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "questions" }],
  questionVoted: [{ type: mongoose.Schema.Types.ObjectId, ref: "questions" }],
});

export const UserModel = mongoose.model("users", UserSchema);
