import mysql from "mysql2";

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '4578',
    database: 'nodemysql'
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('mysql connected');
});

export const signup = async (req, res) =>{
    const {username, password, email} = req.body;
    
    try {
        db.query(`SELECT username FROM users WHERE username='${username}'`, (error, results, fields)=>{
            if(error) throw error;
            if(results.length!=0) res.status(400).json({message: "username is taken"});
            else{
                
                db.query(`
                INSERT INTO users(username, password, email, is_admin, register_date)
                VALUES ('${username}','${password}','${email}', 0, now());
                `, (error, results, fields) =>{
                    if(error) throw error;
                    else res.status(200).json({message: "account created"});
                });
                
            }
        })
    } catch (error) {
        console.log("poop");
        res.status(500).json({message: 'Error'});
}}

export const signin = async (req, res) =>{

}