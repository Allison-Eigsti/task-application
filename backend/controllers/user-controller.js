require('dotenv').config()

const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



async function registerUser(req, res) {
    const { name, password } = req.body

    try{
        const hash = bcrypt.hashSync(password, 10)

        const newUser = new User({ name, password: hash })
        await newUser.save()

        const token = jwt.sign({ id: newUser._id, name: newUser.name }, process.env.JWT_SECRET)
        res.status(201).json({ accessToken: token })
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function loginUser(req, res) {
    const { name, password } = req.body

    try {
        const user = await User.findOne({ name })

        if (!user) {
            return res.status(404).json({ message: "User or password incorrect." })
        }
        
        // authenticate user
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "User or password incorrect." })
        }

        // authorize and serialize w jwt (Create jwt for session)
        // send jwt back to client browser
        const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET)
        console.log('user successfully logged in:', user.name)
        res.json({ accessToken: token })

    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function getUser(req, res) {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) {
            res.status(404).json({ message: "User not found" })
        }

        res.json({ user })
    } catch(err) {
    res.status(500).json({
        message: err.message
    })       
    }
}



module.exports = {
    registerUser,
    loginUser,
    getUser
}