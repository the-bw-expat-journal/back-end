const express = require('express')
const cors = require('cors')

const server = express();
const authMiddleware = require('./auth/auth-middleware.js')
const usersRouter = require('./routers/users-router')
const authRouter = require('./auth/auth-router')
const postsRouter = require('./routers/posts-router')

server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/posts', authMiddleware, postsRouter)

server.get('/', (req, res) => {
    res.status(200).json({ status: "Server is up and running!"})
})

module.exports = server;