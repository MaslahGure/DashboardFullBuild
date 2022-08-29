const pool = require("../config/db");
const queries = require ("../queries/usersQueries");
const bcrypt =require("bcrypt")


const handleNewUser = async(req,res) =>{
    const {username,password,email}=req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    // if user data is not complete raise error
    if(!username || !password ||!email) return res.status(400).json({"message":"Username, password and email are required"});
    //check if email is taken
    pool.query(queries.checkEmailExists,[email],(error,result) =>{
        if(error) throw error;
        // if Email taken
        if(result.rows.length){
            return res.sendStatus(409);//http conflict
        }
        // If Email not taken  
        try {
        //Register new user
        pool.query(queries.addUser,[username,hashedPassword,email],(error,result)=>{
        if(error) throw error;
                res.status(201).json({"success":`New user ${username} created`});
            })
        } catch (err) {
            res.status(500).json({"message":err.message})
        }
  
         });
}; 


module.exports = {
    handleNewUser,
}


