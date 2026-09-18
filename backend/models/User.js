const mongoose = require('mongoose')

// Create new schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
},
{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User