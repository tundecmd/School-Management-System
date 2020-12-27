const express = require('express');
const app = express();
const Manager = require('../models/managerModel');
const router = new express.Router();

// READ MANAGER
router.get('/api/manager', async (req, res) => {
    try {
        const manager = await Manager.find({});
        if (manager.length === 0) {
            return res.status(404).send("no manager found!!!")
        }
        res.status(200).send(manager)
    } catch (err) {
        res.status(400).send(err)
    }
})

// READ A MANAGER
router.get('/api/manager/:id', async (req, res) => {
    //console.log(req.params)
    const _id = req.params.id;
    try {
        const manager = await Manager.findById(_id);
        //console.log('teacher', teacher)
        if (manager.length === 0) {
            return res.status(404).send('manager not found');
        }
        res.status(200).send(manager)    
    } catch (err) {
        res.status(500).send(err)
    }
})

// CREATE A MANAGER
router.post('/api/manager', async (req, res) => {
    const newManager = new Manager(req.body)
    try {
        const managers = await Manager.find({});
        if (managers.length === 0) {
            await newManager.save()
            res.status(201).send(newManager)
        } else {
            res.status(500).send('New manager cannot be created. A manager already exist!!!')
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

// UPDATE A MANAGER
router.patch('/api/manager/:id', async (req, res) => {
    const _id = req.params.id;
    const allowedUpdates = ['firstname', "password", 'lastname', 'gender', "username", "email", "password"];
    const updates = Object.keys(req.body);
    const isValid = updates.every(update => allowedUpdates.includes(update))
    if (isValid === false) {
        return res.status(400).send( "Invalid updates")
    }
    try {
        // const updatedManager = await Manager.findByIdAndUpdate(_id, req.body, {
        //     new: true,
        //     runValidators: true
        // })
        const managerToBeUpdated = await Manager.findById(_id)
        updates.forEach((update) => managerToBeUpdated[update] = req.body[update])
        const updatedManager = await managerToBeUpdated.save()
        if (updatedManager === false) {
            return res.status(404).send('no update')
        }
        res.status(200).send(updatedManager)
    } catch (err) {
        res.status(400).send(err)
    }
})

// DELETE MANAGER
router.delete('/api/manager/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const deletedManager = await Manager.findByIdAndDelete(_id);
        if (deletedManager.length === 0) {
            return res.status(404).send('manager not found')
        }
        res.status(200).send(`${deletedManager} was deleted successfully!!!`)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;