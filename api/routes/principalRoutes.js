const express = require('express');
const app = express();
const Principal = require('../models/principalModel');
//const express = require('express');
const router = new express.Router();
const authPrincipal = require('../middlewares/authPrincipal');

// PUBLIC
// CREATE A PRINCIPAL
router.post('/api/principals', async (req, res) => {
    const newPrincipal = new Principal(req.body)
    try {
        const token = await newPrincipal.generateAuthToken()
        await newPrincipal.save()
        res.status(201).send({ newPrincipal, token })
    } catch (err) {
        res.status(400).send('unable to create principals')
    }
})

// PUBLIC
// LOGIN 
router.post('/api/principals/login', async (req, res) => {
    try {
        const principal = await Principal.findByCredentials(req.body.email, req.body.password);
        const token = await principal.generateAuthToken();        
        res.send({ principal, token });
    } catch (e) {
        res.status(400).send('unable to login uuu')
    }
})

// PRIVATE
// LOGOUT
router.post('/api/principals/logout', authPrincipal, async (req, res) => {
    try {
        req.principal.tokens = req.principal.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.principal.save()
        res.status(200).send('logged out Successfully')
    } catch (e) {
        res.status(400).send('Unable to log out')
    }
})

// PRIVATE
// PRINCIPAL LOGOUTALL
router.post('/api/principals/logoutall', authPrincipal, async (req, res) => {
    try {
        req.principal.tokens = []
        await req.principal.save()
        res.status(200).send('All sessions logged out successfully')
    } catch (e) {
        res.status(200)
    }
})

// PRIVATE
// READ PRINCIPAL
router.get('/api/principals', authPrincipal, async (req, res) => {
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
router.get('/api/principals/:id', authPrincipal, async (req, res) => {
    const _id = req.params.id;
    try {
        const principal = await Principal.findById(_id);
        if (!principal) {
            return res.status(404).send('principal not found');
        }
        res.status(200).send(principal)    
    } catch (err) {
        res.status(500).send(err)
    }
})

// UPDATE A PRINCIPAL
router.patch('/api/principals/:id', authPrincipal, async (req, res) => {
    const _id = req.params.id;
    const allowedUpdates = ['firstname', 'lastname', 'gender', "username", "email", "password"];
    const updates = Object.keys(req.body);
    const isValid = updates.every(update => allowedUpdates.includes(update))
    if (isValid === false) {
        return res.status(400).send( "Invalid updates")
    }
    try {
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
router.delete('/api/principals/:id', authPrincipal, async (req, res) => {
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