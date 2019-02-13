const express = require('express');

// server commands
const server = express();
server.use(express.json());

// const helmet = require('helmet');
// const morgan = require('morgan');

const postsRouter = require('./posts/postsRouter');
const usersRouter = require('./users/usersRouter');


// server.use(helmet());
// server.use(morgan('dev'));

server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);

server.get('/', async (req, res) => {
    res.send(`
    <h2>Initial test</h2>`);
})

module.exports = server;