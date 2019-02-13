const express = require('express');

const Users = require('../data/helpers/userDb');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await Users.get();
        res.status(200).json(users);
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving users '})
    }
});

// To get user by id
router.get('/:id', async (req, res) => {
    try{
        const user = await Users.getById(req.params.id);
        if (user){
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID could not be found." });
        }
    } catch {
        res.status(500).json({ message: "The user information could not be retrieved"});
    }
})

module.exports = router;