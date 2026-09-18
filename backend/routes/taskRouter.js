const express = require('express')
const router = express.Router()
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/task-controller')

// const { model } = require('mongoose')
// const Order = require('../models/Tasks.js')

// routes
router.get('/', getAllTasks)

router.get('/:id', getTaskById)

router.post('/', createTask)

router.put('/:id', updateTask)

router.delete('/:id', deleteTask)

module.exports = router