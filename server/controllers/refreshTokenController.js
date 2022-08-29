const pool = require("../config/db");
const queries = require ("../queries/usersQueries");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const handleRefreshToken = (req,res) =>{
    const cookies =req.cookies;
    // check whether the user has cookies
    if(!cookies?.jwt) return res.sendStatus(401);
    //give user access if they have the correct cookie
    const refreshToken = cookies.jwt;


    pool.query(queries.checkRefreshTokenExists,[refreshToken], (error,result) =>{
        if(error) throw error;
        // if user does nto exist send unauthorized
        if(!result.rows.length){
            return res.sendStatus(403);//http forbidden
    
        }
        const user = result.rows[0];//update before launch
        // evaluate jwt 
        const username =user.username;
        const email = user.email;
        const userId =user.id;
        const photoUrl =user.photourl;
        jwt.verify(
            refreshToken,
            process.env.ACCESS_TOKEN_SECRET,
            (err,decodedToken) =>{
                if(err || user.username !==decodedToken.username) return res.sendStatus(403);

                const accessToken = jwt.sign(
                    {"username":decodedToken.username},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: "5m"} // AccessToken renewal interval
                );
                res.json({accessToken,username,email,userId,photoUrl})
            }
        );
         });
}; 


module.exports = {
    handleRefreshToken,
}