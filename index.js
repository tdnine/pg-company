//require
const express = require('express')
const pool = require('./db')
const errorHandler = require('./errorHandler')

//app
const app = express()

//route import
const employeeRouter = require('./routes/employee')

//bodyparser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.use('/employees', employeeRouter)

// Error Handling middleware
app.use(errorHandler.logErrors)
app.use(errorHandler.requestNotMatch)


//listen
app.listen(process.env.PORT || 3000, () => console.log(`App listening on port: 3000`))


