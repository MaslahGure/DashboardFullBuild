const pool = require("../config/db");
const queries = require ("../queries/usersQueries");
const bcrypt =require("bcrypt")


const handleUpdateUserPhoto = async(req,res) =>{
    const {photoUrl,email}=req.body;
    if(!photoUrl || !email) return res.status(400).json({"message":"Upload Image"});
    //check if email is exists
    pool.query(queries.checkEmailExists,[email],(error,result) =>{
        if(error) throw error;
        // if Email does not exist
        if(!result.rows.length){
            return res.sendStatus(401);//http forbidden
        }
        // If Email not taken  
        try {
        //Register new user
        pool.query(queries.updateUserPhotoUrl,[photoUrl,email],(error,result)=>{
        if(error) throw error;
                res.status(201).json({"success":`photo update`});
            })
        } catch (err) {
            res.status(500).json({"message":err.message})
        }
  
         });
}; 
const handlePasswordChange = async(req,res) =>{
    const {currentPassword,newPassword,email}=req.body;
    if(!currentPassword || !email || !newPassword) return res.status(400).json({"message":"missing current or new password"});
    //check if email is exists
    pool.query(queries.checkEmailExists,[email],async(error,result) =>{
        if(error) throw error;
        // if Email does not exist
        if(!result.rows.length){
            return res.sendStatus(401);//http forbidden
        }
        const user = result.rows[0]
        const match =await bcrypt.compare(currentPassword,user.password);
        // If Email exists taken  
        if(match){
            try {
            //Update password
            const hashedPassword = await bcrypt.hash(newPassword,10);
            pool.query(queries.updateUserPassword,[hashedPassword,email],(error,result)=>{
                    if(error) throw error;
                    res.status(201).json({"success":`password updated`});
                })
            } catch (err) {
                res.status(500).json({"message":err.message})
            }
        }else{
            res.sendStatus(401);// unauthorized
        }
  
         });
        
}; 


module.exports = {
    handleUpdateUserPhoto,
    handlePasswordChange
}


