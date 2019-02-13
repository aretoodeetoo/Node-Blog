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

module.exports = router;