import express from "express";
import { verifyToken } from "./users.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// get logged in user information
router.get("/:userID", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json(user);
  } catch (error) {
    console.error(error);
  }
});

export { router as userInfoRouter };
