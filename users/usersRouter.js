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

// Add a user
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name){
            res.status(400).json({ message: "Please enter a username to continue "})
            } else {
            const newUser = await Users.insert(req.body);
            res.status(201).json(newUser)
            }
        } catch {
            res.status(500).json({ message: "The user could not be added to our database"});
        }
    } 
)

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const count = await Users.remove(req.params.id);
        if (count > 0){
            res.status(200).json({ message: "User successfully removed!"});
        } else {
            res.status(404).json({message: "The user with the requested ID does not exist."});
        }
    } catch {
        res.status(500).json({ message: "Error deleting this user."});
    }
})

// Update a user
router.put('/:id', async (req, res) => {
    try {
        const {username, id } = await Users.update(req.body, req.params.id);
        if (!username || !id){
            res.status(400).json({ message: "Please provide both a username and an id to update a user."});
        } else {
            const updatedUser = await Users.insert(req.body);
            res.status(200).json(updatedUser);
        }
    } catch {
        res.status(500).json({ message: "Error updating this user." });
    }
})

module.exports = router;