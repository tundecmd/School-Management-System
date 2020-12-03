const express = require('express')
const app = express()
const Student = require('../models/studentModel');
//const express = require('express');
const router = new express.Router();

// READ STUDENTS
router.get('/api/students', async (req, res) => {
    //const newStudent = new Student()
    try {
        const students = await Student.find({})
        if (!students || students.length === 0) {
            return res.status(404).send("no student found!!!")
        }
        res.status(200).send(students)
    } catch (err) {
        res.status(400).send(err)
    }
})

// READ A STUDENT
router.get('/api/students/:id', async (req, res) => {
    //console.log(req.params)
    const _id = req.params.id;
    try {
        const student = await Student.findById(_id);
        //console.log('student', student)
        if (!student) {
            return res.status(404).send();
        }
        res.send(student)    
    } catch (err) {
        res.status(500).send(err)
    }
})

// CREATE A STUDENT
router.post('/api/students', async (req, res) => {
    const newStudent = new Student(req.body)
    try {
        await newStudent.save()
        res.status(201).send(newStudent)
    } catch (err) {
        res.status(400).send(err)
    }
})

// UPDATE A STUDENT
router.patch('/api/students/:id', async (req, res) => {
    const _id = req.params.id;
    const allowedUpdates = ['firstname', 'lastname', 'gender', "username", "email"];
    const updates = Object.keys(req.body);
    const isValid = updates.every(update => allowedUpdates.includes(update))
    if (isValid === false) {
        return res.status(400).send( "Invalid updates")
    }
    try {
        const updatedStudent = await Student.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        })
        if (!updatedStudent) {
            res.status(404).send('no update')
        }
        res.status(200).send(updatedStudent)
    } catch (err) {
        res.status(400).send(err)
    }

})

// DELETE STUDENT
router.delete('/api/students/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const deletedStudent = await Student.findByIdAndDelete(_id);
        if (!deletedStudent) {
            return res.status(404).send('no student found')
        }
        res.status(200).send(`${deletedStudent} was deleted successfully!!!`)
    } catch (err) {
        res.status(400).send(err)
    }
})
  
module.exports = router;