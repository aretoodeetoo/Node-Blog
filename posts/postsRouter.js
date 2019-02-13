const express = require('express');
const Posts = require('../data/helpers/postDb');

const router = express.Router();

// Get request to /api/posts
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get();
        res.status(200).json(posts);
    } catch {
        res.status(500).json({ error: 'There was an error retrieving the posts'});
    }
})

// Get post by id
router.get('/:id', async (req, res) => {
    try{
        const post = await Posts.getById(req.params.id);
        if (post){
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID could not be retrieved."});
        }
    } catch {
        res.status(500).json({ message: "The post information could not be retrieved."});
    }
})

// Add a post
router.post('/', async (req, res) => {
    try {
        const { text, user_id } = req.body;
        if (!text || !user_id){
            res.status(400).json({ message: "Please enter both post text and username to continue"})
        } else {
            const newPost = await Posts.insert(req.body);
            res.status(201).json(newPost);
        }
    } catch {
        res.status(500).json({ message: "The post could not be added."});
    }
})

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const count = await Posts.remove(req.params.id);
        if (count > 0){
            res.status(200).json({ message: "Post successfully removed!"});
        } else {
            res.status(404).json({ message: "The post could not be deleted."});
        }
    } catch {
        res.status(500).json({ message: "Error deleting this post." });
    }
})

// Update a post
router.put('/:id', async (req, res) => {
    try {
        const { id } = await Posts.update(req.params.id);
        const { text } = await Posts.update(req.body)
        if (!text || !id){
            res.status(400).json({ message: "Please provide both text and user id to update this post."});
        } else {
            const updatedPost = await Posts.insert(req.body);
            res.status(200).json(updatedPost);
        }
    } catch {
        res.status(500).json({ message: "Error updating this post."});
    }
})

module.exports = router;