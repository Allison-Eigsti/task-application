require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const db = require('./config/db')
const taskRouter = require('./routes/taskRouter.js')
const userRouter = require('./routes/userRouter.js')
const cors = require('cors')
const logger = require('./middlewares/logs')
const serverError = require('./middlewares/server-error')
const notFound = require('./middlewares/not-found')
const authorization = require('./middlewares/authorization')

db()

// poner alli en el argumento the dominion name of your api so that its not for public use
app.use(express.json())
app.use(cors())
app.use(logger)

// Unprotected Routes
app.use('/user', userRouter)

// Auth middleware
app.use(authorization)

// Protected Routes
app.use('/tasks', taskRouter)

app.use(notFound)
app.use(serverError)

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`)
})