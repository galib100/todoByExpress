"use strict";

var express = require('express');

var router = express.Router();

var donarController = require('../controllers/donar');

router.get('/signup', donarController.signUpController);
router.post('/signup', donarController.postSignupController);
router.get('/edit/:id', donarController.editController);
router.post('/edit/:id', donarController.editController);
router.get('/delete/:id', donarController.deleteController);
router.get('/login', donarController.loginController);
router.post('/login', donarController.postLoginController);
router.get('/alldonar', donarController.allDonarController);
module.exports = router;