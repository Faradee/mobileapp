import express from "express";
import { signin, signup } from "../controllers/users.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).json({ message: "hi" });
});
router.post("/signup", signup);
router.post("/signin", signin);
 
export default router;
 