const Task = require('../models/Tasks.js')

async function getAllTasks(req, res) {
    try {
        const tasks = await Task.find()
        return res.json(tasks)

    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}

async function getTaskById(req, res) {
    try {
        const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).json({ message: "Order does not exist" })
        }

        return res.json(task)

    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}


async function createTask(req, res) {
    console.log(22)
    try {
        const { name, description, status } = req.body
        const newTask = new Task({ name, description, status })
        newTask.save()

        res.status(201).json(newTask)

    }
    catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function updateTask(req, res) {
    try {
        const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).json({ message: "User not found" })
        }

        if (req.body.name !== undefined) {
            task.name = req.body.name
        }

        if (req.body.description !== undefined ) {
            task.description = req.body.description
        }

        if (req.body.status !== undefined ) {
            task.status = req.body.status
        }

        await task.save()

        res.json(task)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


async function deleteTask(req, res) {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        res.json({ message: "Task deleted successfully" })

    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}



module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}