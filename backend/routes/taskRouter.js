const express = require('express')
const router = express.Router()
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/task-controller')
const authorization = require('../middlewares/authorization')


// const { model } = require('mongoose')
// const Order = require('../models/Tasks.js')

// routes
router.get('/', getAllTasks)

router.get('/:id', getTaskById)

router.post('/', authorization, createTask)

router.put('/:id', authorization, updateTask)

router.delete('/:id', authorization, deleteTask)

module.exports = router