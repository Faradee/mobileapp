import mysql from "mysql2";
import express from "express";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import jwt from 'jsonwebtoken'
import cors from "cors";

const app = express();

const authenticateToken = (req, res, next) => {
  console.log(req.headers);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401);

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.status(403);
    req.user = user;
    next();
  });
};

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/posts", authenticateToken, postRoutes);



app.listen("3000", () => {
  console.log("server started on port 3000");
});
