const express = require('express')
const router = express.Router()

const { registerUser, loginUser, getUser } = require('../controllers/user-controller')
const authorization = require('../middlewares/authorization')


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', authorization, getUser)


module.exports = router