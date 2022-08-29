const pool = require("../config/db");
const queries = require ("../queries/usersQueries");
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config();


const handleLogin = async(req,res) =>{
    const {password,email}=req.body;
    // if user data is not complete raise error
    if(!email || !password) return res.status(400).json({"message":"Username and password are required"});
    //check user exists
    pool.query(queries.checkEmailExists,[email],async (error,result) =>{
        if(error) throw error;
        // if user does nto exist send unauthorized
        if(!result.rows.length){
            return res.sendStatus(401);//http unauthorized
            
        }
        const user = result.rows[0];//update before launch
        // If user exists match password 
        const match =await bcrypt.compare(password,user.password);

        if(match){
            //send JWT - Tokens
            const accessToken = jwt.sign(
                {"username":user.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "60s"}
            )
            const refreshToken = jwt.sign(
                {"username":user.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "1d"}
            );

            pool.query(queries.updateUserToken,[refreshToken,user.username],(error,result) =>{
                if(error) throw error;
                //refresh token issued
                //res.status(200).send("Refresh token updated updated successfully");
             });
            res.cookie("jwt",refreshToken,{httpOnly: true, sameSite: 'None', secure: true,maxAge:24 * 60 * 60 * 1000})
            res.json({accessToken}) // at the frontend store in memory for security
        }else{
            res.sendStatus(401);// unauthorized
        }
  
         });
}; 


module.exports = {
    handleLogin,
}