require('dotenv').config()

const { logger, lockout, handleErrors } = require('../middleware/server-mw')
const express = require('express')
const cors = require('cors')
const DbRouter = require('../router/dbRouter')
const helmet = require('helmet')
const server = express()
// const port = process.env.PORT || 5000

// server.listen(port)
server.use(express.json())
server.use('/api/accounts', DbRouter)
server.use(cors())
server.use(helmet())
server.use(logger)

server.get('/', (req, res) => {
    res.send(`<span style="text-align:center; margin-top:100px;"><h3>Welcome to</h3></h3><h1>Some Cool Company Name\'s</h1><h2>API Server</h2></span>`)
})

server.use(handleErrors)

module.exports = server