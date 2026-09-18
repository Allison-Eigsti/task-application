const mongoose = require('mongoose')

// Create new schema
const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: false }
},
{
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task