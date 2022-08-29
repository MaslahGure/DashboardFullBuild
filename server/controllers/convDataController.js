const pool = require("../config/db");
const queries = require ("../queries/convDataQueries")



const handleConvData = async(req,res) =>{
        pool.query(queries.getConvdata, (error,result) =>{
            if(error) throw error;
            res.status(200).json(result.rows);
        }) 
   
}

const handleConvStat = async(req,res) =>{
    pool.query(queries.getConvstat, (error,result) =>{
        if(error) throw error;
        res.status(200).json(result.rows);
    })
};

module.exports = {
    handleConvData,
    handleConvStat,
};