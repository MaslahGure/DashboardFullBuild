const pool = require("../config/db");
const queries = require ("../queries/usersQueries");


const handleLogout = (req,res) =>{
    // On client, also delete the accessToken -- note

    const cookies =req.cookies;
    // check whether the user has cookies
    if(!cookies?.jwt) return res.sendStatus(204);// No content is needed to be sent
    //if user has access to a cookie
    const refreshToken = cookies.jwt;


    pool.query(queries.checkRefreshTokenExists,[refreshToken], (error,result) =>{
        if(error) throw error;
        // if user does nto exist send unauthorized
        if(!result.rows.length){
            res.clearCookie("jwt",{httpOnly: true, sameSite: 'None', secure: true});
            return res.sendStatus(204);//No content
    
        }
        const user = result.rows[0];

        // update refreshToken
        pool.query(queries.updateUserToken,["",user.username],(error,result) =>{
            if(error) throw error;
    
         });


         });
         res.clearCookie("jwt",{httpOnly: true, sameSite: 'None', secure: true}); // add secure true when launching
         return res.sendStatus(204);//No content
}; 


module.exports = {
    handleLogout
}