// implement your server here
// require your posts router and connect it here
const express = require('express');

const server = express();
const postsRouter = require('./posts/posts-router.js');

server.use(express.json());

server.use(postsRouter);

server.get('/', async (req, res) => {
    console.log(req.query);
    res.send(`
        <h2>Api is running!!!</h2>
    `)
})



module.exports = server;