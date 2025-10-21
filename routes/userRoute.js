const express = require('express')
const userController = require('../controllers/userController')
const {protect} = require('../middleware/auth')


const router = express.Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/getUserInfo/:id',protect, userController.getUserInfo)


module.exports = router



