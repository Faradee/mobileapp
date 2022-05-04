import mysql from "mysql2";
import express from "express";
import userRoutes from "./routes/users.js";
import cors from "cors";



const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.listen('3000', ()=>{
    console.log('server started on port 3000')
});