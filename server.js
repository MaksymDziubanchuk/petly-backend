const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()
const { DB_HOST, PORT = 4001 } = process.env

mongoose.set('strictQuery', true)

mongoose
    .connect(DB_HOST)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Database connected successfuly on port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error.message)
        process.exit(1)
    })
