const express = require('express')
const app = express()
const Teacher = require('../models/teacherModel');
//const express = require('express');
const router = new express.Router();

// READ TEACHERS
router.get('/api/teachers', async (req, res) => {
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
router.get('/api/teacher/:id', async (req, res) => {
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

// UPDATE A TEACHER
router.patch('/api/teachers/:id', async (req, res) => {
    const _id = req.params.id;
    const allowedUpdates = ['firstname', 'lastname', 'gender', "username", "email", "password"];
    const updates = Object.keys(req.body);
    const isValid = updates.every(update => allowedUpdates.includes(update))
    if (isValid === false) {
        return res.status(400).send( "Invalid updates")
    }
    try {
        // const updatedTeacher = await Teacher.findByIdAndUpdate(_id, req.body, {
        //     new: true,
        //     runValidators: true
        // })
        const teacherToBeUpdated = await Teacher.findById(_id)
        updates.forEach((update) => teacherToBeUpdated[update] = req.body[update])
        const updatedTeacher = await teacherToBeUpdated.save()
        if (!updatedTeacher) {
            res.status(404).send('no update')
        }
        res.status(200).send(updatedTeacher)
    } catch (err) {
        res.status(400).send(err)
    }
})

// DELETE TEACHER
router.delete('/api/teacher/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(_id);
        if (!deletedTeacher) {
            return res.status(404).send('teacher not found')
        }
        res.status(200).send(`${deletedTeacher} was deleted successfully!!!`)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;