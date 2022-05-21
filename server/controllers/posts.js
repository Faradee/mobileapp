import db from "../db.js";

export const getPosts = async (req, res) => {
  console.log("got posts")
  try {
    db.query(
      `
            SELECT * FROM notes WHERE author='${req.user.username}';
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
  const { color, text } = req.body; 
  try { 
    db.query(
      `
      INSERT INTO notes( color, text, date, author)
      VALUES ('${color}','${text}', now(), '${req.user.username}'); 
      `,
      (error, result) => {
        if (error) throw error;
        else res.status(200).json({message: "post created successfully" });
      }
    ); 
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

export const deletePost = async (req, res) => {
  console.log("deleting post"); 
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
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};
