const express = require('express');
const router = express.Router();
const userUpdateController = require('../controllers/userUpdateController');



router.route('/')
        .post(userUpdateController.handleUpdateUserPhoto)
        .put(userUpdateController.handlePasswordChange);

module.exports = router;