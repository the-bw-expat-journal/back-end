const express = require('express')

const server = express();

const usersRouter = require('./routers/users-router')
const authRouter = require('./auth/auth-router')
const postsRouter = require('./routers/posts-router')

server.use(express.json());

server.use('/api', usersRouter);
server.use('/api/auth', authRouter);
server.use('/api', postsRouter)

server.use(function(req, res, next) {
    req.name = "John Doe"
})
server.get('/', (req, res) => {
    res.json({ status: "Server is up and running!"})
})

module.exports = server;