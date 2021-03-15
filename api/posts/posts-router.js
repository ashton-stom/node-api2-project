// implement your posts router here
const express = require('express');

const router = express.Router();
const posts = require('./posts-model.js');


router.get('/api/posts', async (req, res) => {
    try {
        const postList = await posts.find();
        res.json(postList)
    } catch (err) {
        console.log(error);
        res.status(500).json({ message: 'The posts information could not be received.' })
    }
})

router.get('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    const post = await posts.findById(id)
    if (!post) {
        res.status(404).json({ message: "The post with the specified ID does not exist" })
    } else {
        try {
            res.json(post);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "The post information could not be retrieved" })
        }
    }
})

router.post('/api/posts', async (req, res) => {
    const post = req.body;
    if (!post.title || !post.contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
        try {
            const newPost = await posts.insert(post);
            res.status(201)
            res.json(newPost)
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "There was an error while saving the post to the database" })
        }
    }
})

router.put('/api/poata/:id', async (req, res) => {
    const post = req.body;
    const { id } = req.params;

    if (!post.id) {
        res.status(404).json({ message: "The post with the specified ID does not exist" })
    } else if (!post.title || !post.contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
        try {
            const updatedPost = await posts.update(id, post)
            res.json(updatedPost)
            res.status(201).json({ message: "Post has been created!" })
        } catch (err) {
            res.status(500).json({ message: "The post information could not be modified" })
        }
    }
})

router.delete('/api/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await posts.remove(id);
        if (post > 0) {
            res.json(post);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "The user information could not be modified" })
    }
})

router.get('/api/posts/:id/comments', async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await posts.findPostComments(id)
        if (!this.post.id) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            res.json(comment)
        }
    } catch (err) {
        res.status(500).json({ message: "The comments information could not be retrieved" })
    }
})

module.exports = router;