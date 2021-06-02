const express  = require('express');
const router= express.Router();
const donarController = require('../controllers/donar')

router.get('/signup',donarController.signUpController)
router.post('/signup',donarController.postSignupController)
router.get('/edit/:id',donarController.editController)
router.post('/edit/:id',donarController.editController)
router.get('/delete/:id',donarController.deleteController)
router.get('/login',donarController.loginController)
router.post('/login',donarController.postLoginController)
router.get('/alldonar',donarController.allDonarController)
module.exports= router