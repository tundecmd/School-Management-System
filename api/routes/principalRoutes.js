const express = require('express');
const app = express();
const Principal = require('../models/principalModel');
//const express = require('express');
const router = new express.Router();

// READ PRINCIPAL
router.get('/api/principals', async (req, res) => {
    try {
        const principals = await Principal.find({});
        if (!principals || principals.length === 0) {
            return res.status(404).send("no principal found!!!")
        }
        res.status(200).send(principals)
    } catch (err) {
        res.status(400).send(err)
    }
})

// READ A PRINCIPAL
router.get('/api/principals/:id', async (req, res) => {
    //console.log(req.params)
    const _id = req.params.id;
    try {
        const principal = await Principal.findById(_id);
        //console.log('teacher', teacher)
        if (!principal) {
            return res.status(404).send('principal not found');
        }
        res.status(200).send(principal)    
    } catch (err) {
        res.status(500).send(err)
    }
})

// CREATE A PRINCIPAL
router.post('/api/principals', async (req, res) => {
    const newPrincipal = new Principal(req.body)
    try {
        await newPrincipal.save()
        res.status(201).send(newPrincipal)
    } catch (err) {
        res.status(400).send(err)
    }
})

// UPDATE A PRINCIPAL
router.patch('/api/principals/:id', async (req, res) => {
    const _id = req.params.id;
    const allowedUpdates = ['firstname', 'lastname', 'gender', "username", "email", "password"];
    const updates = Object.keys(req.body);
    const isValid = updates.every(update => allowedUpdates.includes(update))
    if (isValid === false) {
        return res.status(400).send( "Invalid updates")
    }
    try {
        // const updatedPrincipal = await Principal.findByIdAndUpdate(_id, req.body, {
        //     new: true,
        //     runValidators: true
        // })
        const principalToBeUpdated = await Principal.findById(_id)
        updates.forEach((update) => principalToBeUpdated[update] = req.body[update])
        const updatedPrincipal = await principalToBeUpdated.save()
        if (updatedPrincipal === false) {
            res.status(404).send('no update')
        }
        res.status(200).send(updatedPrincipal)
    } catch (err) {
        res.status(400).send(err)
    }
})

// DELETE PRINCIPAL
router.delete('/api/principals/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const deletedPrincipal = await Principal.findByIdAndDelete(_id);
        if (deletedPrincipal === false) {
            return res.status(404).send('principal not found')
        }
        res.status(200).send(`${deletedPrincipal} was deleted successfully!!!`)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;