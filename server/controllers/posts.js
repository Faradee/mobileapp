import db from "../db.js";

export const getPosts = async (req, res) => {
  try {
    db.query(
      `
            SELECT * FROM notes WHERE author='${req.body.login}';
        `,
      (error, results) => {
        if (error) throw error;
        else res.status(200).json(results);
      }
    );
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
};

export const addPost = async (req, res) => {
  const { id, color, text } = req.body;
  try {
    db.query(
      `
      INSERT INTO notes(id, color, text, date, author)
      VALUES ('${id}','${color}','${text}', now(), '${req.username}');
      `,
      (error, result) => {
        if (error) throw error;
        else res.status(200).json({ message: "post created successfully" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

export const deletePost = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
 
  try {
    db.query(`SELECT id FROM notes WHERE id='${id}'`, (error, result) => {
      if (error) throw error;
      if (result.length == 0)
        res.status(404).json({ message: "post not found" });
      else {
        db.query(`DELETE FROM notes WHERE id='${id}'`, (error, result) => {
          if (error) throw error;
          else res.status(200).json({ message: "post deleted successfully" });
        });
      }
    });
  } catch (error) {
    console.log("poop");
    res.status(500).json({ message: "Error" });
  }
};
