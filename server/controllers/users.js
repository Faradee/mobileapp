import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const saltRounds = 10;

export const signup = async (req, res) => {
  const { username, password, email } = req.body;
  //if (!(username && password && email)) {
  //res.status(400);
  //}
  //else
  try {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) throw err;

      db.query(
        `SELECT * FROM users WHERE username='${username}' OR email='${email}'`,
        (error, results) => {
          if (results.length != 0)
            res.status(400).json({ message: "username is taken" });
          else {
            db.query(
              `
                INSERT INTO users(username, password, email, is_admin, register_date)
                VALUES ('${username}','${hash}','${email}', 0, now());
                `,
              (error, results) => {
                if (error) throw error;
                else {
                  const accessToken = jwt.sign(req.body, process.env.SECRET);
                  res.status(200).json({
                    username,
                    email,
                    accessToken,
                  });
                }
              }
            );
          }
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const signin = async (req, res) => {
  const { login, password } = req.body;
  console.log("logged in")  
  try {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      db.query(
        `SELECT password FROM users WHERE username='${login}' OR email='${login}'`,
        (err, results) => {
          if (err) throw err;
          if (results.length == 0)
            res.status(404).json({ message: "Password or login is incorrect" });
          else {
            //const hash = results[0].password;
            bcrypt.compare(password, hash, (err, correctPassword) => {
              if (!correctPassword)
                res
                  .status(404)
                  .json({ message: "Password or login is incorrect" });
              db.query(
                `SELECT * FROM users WHERE username='${login}' OR email='${login}'`,
                (err, results) => {
                  if (err) throw err;
                  else {
                    if (results.length != 0) {
                      const accessToken = jwt.sign(
                        results[0],
                        process.env.SECRET
                      );
                      res.status(200).json({
                        username: results[0].username,
                        email: results[0].email,
                        accessToken: accessToken,
                      });
                    } else
                      res.status(404).json({ message: "Account not found" });
                  }
                }
              );
            });
          }
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};
