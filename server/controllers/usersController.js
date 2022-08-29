const pool = require("../config/db");
const queries = require ("../queries/usersQueries")



const getAllUsers = async(req,res) =>{
        pool.query(queries.AllUsers, (error,result) =>{
            if(error) throw error;
            res.status(200).json(result.rows);
        }) 
   
}

const getUserById = async(req,res) =>{
    const id = parseInt(req.params.id);
    pool.query(queries.UserById,[id],(error,result) =>{
        if(error) throw error;
        res.status(200).json(result.rows);
    })
};
const addUser = async(req,res) =>{
    const {username,password,email}=req.body;
    pool.query(queries.checkEmailExists,[email],(error,result) =>{
        if(error) throw error;
        //Email taken
        if(result.rows.length){
            res.send("Email taken")
        }
        //Register new user
        pool.query(queries.addUser,[username,password,email],(error,result)=>{
            if(error) throw error;
           
            res.status(200).send("Student created");
        })
     })
}; 
const deleteUser = async(req,res) =>{
    const id = parseInt(req.params.id);
    pool.query(queries.UserById,[id],(error,result) =>{
        if(error) throw error;
        //when student already does not exist
        if(!result.rows.length){
            res.send("student does not exist");
        }
     })
    pool.query(queries.deleteUser,[id],(error,result) =>{
        if(error) throw error;
        //if deleted successfully
        res.status(200).send("Student deleted");
     })
};
const updateUser = async(req,res) =>{
    const id = parseInt(req.params.id);
    const {password}=req.body;
    pool.query(queries.UserById,[id],(error,result) =>{
        if(error) throw error;
        //when student already does not exist
        if(!result.rows.length){
            res.send("student does not exist");
        }
     })
    pool.query(queries.updateUser,[password,id],(error,result) =>{
        if(error) throw error;
        //password updated
        res.status(200).send("Password updated successfully");
     })
};


module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
};