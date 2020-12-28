const express = require('express')
const app = express()
const Teacher = require('../models/teacherModel');
const router = new express.Router();
const authTeacher = require('../middlewares/authTeacher');

// PUBLIC
// CREATE A TEACHER
router.post('/api/teachers', async (req, res) => {
    const newTeacher = new Teacher(req.body)
    try {
        await newTeacher.save()
        res.status(201).send(newTeacher)
    } catch (err) {
        res.status(400).send(err)
    }
})

// PUBLIC
// TEACHER LOGIN
router.post('/api/teachers/login', async (req, res) => {
    try {
        const teacher = await Teacher.findByCredentials(req.body.email, req.body.password);
        const token = await teacher.generateAuthToken()
        res.send({teacher, token})
    } catch (error) {
        res.status(400).send('problem logging in')
    }
})


// PRIVATE
// Teacher Logout
router.post('/api/teachers/logout', authTeacher, async (req, res) => {
    try {
        req.teacher.tokens = req.teacher.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.teacher.save()
        res.status(200).send('session logged out successfully')
    } catch (error) {
        res.status(400).send('problem logging out')
    }
})

// PUBLIC
// READ TEACHERS
router.get('/api/teachers', authTeacher,  async (req, res) => {
    try {
        const teachers = await Teacher.find({});
        if (!teachers || teachers.length === 0) {
            return res.status(404).send("no teacher found!!!")
        }
        res.status(200).send(teachers)
    } catch (err) {
        res.status(400).send(err)
    }
})

// READ A TEACHER
router.get('/api/teacher/:id', authTeacher, async (req, res) => {
    //console.log(req.params)
    const _id = req.params.id;
    try {
        const teacher = await Teacher.findById(_id);
        //console.log('teacher', teacher)
        if (!teacher) {
            return res.status(404).send('teacher not found');
        }
        res.status(200).send(teacher)    
    } catch (err) {
        res.status(500).send(err)
    }
})

// UPDATE A TEACHER
router.patch('/api/teachers/me', authTeacher, async (req, res) => {
    const allowedUpdates = ['firstname', 'lastname', 'gender', "username", "email", "password"];
    const updates = Object.keys(req.body);
    const isValid = updates.every(update => allowedUpdates.includes(update))
    if (isValid === false) {
        return res.status(400).send( "Invalid updates")
    }
    try {
        updates.forEach((update) => req.teacher[update] = req.body[update])
        const updatedTeacher = await req.teacher.save()
        res.status(200).send(updatedTeacher)
    } catch (err) {
        res.status(400).send(err)
    }
})

// DELETE TEACHER
router.delete('/api/teacher/me', authTeacher, async (req, res) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(req.teacher._id);
        res.status(200).send(`${deletedTeacher} was deleted successfully!!!`)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;