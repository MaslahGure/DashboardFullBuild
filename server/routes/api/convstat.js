const express =require('express')
const router =express.Router();
const convDataController =require("../../controllers/convDataController");



router.get("/",convDataController.handleConvStat);

module.exports =router;