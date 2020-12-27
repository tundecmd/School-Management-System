const express = require('express');
const Student = require('../models/studentModel');
const app = express()
//const Student = require('../models/studentModel');
//const express = require('express');
const router = new express.Router();
const auth = require('../middlewares/auth');

// READ STUDENTS
router.get('/api/students/me', auth, async (req, res) => {
    //const newStudent = new Student()
    //console.log(req.student)
    res.send(req.student)
})

// READ A STUDENT
// router.get('/api/students/:id', auth, async (req, res) => {
//     //console.log(req.params)
//     const _id = req.params.id;
//     try {
//         const student = await Student.findById(_id);
//         //console.log('student', student)
//         if (!student) {
//             return res.status(404).send();
//         }
//         res.send(student)    
//     } catch (err) {
//         res.status(500).send(err)
//     }
// })

// PUBLIC
// CREATE A STUDENT
router.post('/api/students', async (req, res) => {
    const newStudent = new Student(req.body)
    try {
        await newStudent.save()
        const token = await newStudent.generateAuthToken()
        res.status(201).send({newStudent, token})
    } catch (err) {
        res.status(400).send(err)
    }
})

// PUBLIC
// LOGIN A STUDENT
router.post('/api/students/login', async (req, res) => {
    try {
        const student = await Student.findByCredentials(req.body.email, req.body.password);
        const token = await student.generateAuthToken()
        res.send({student, token})
    } catch (e) { 
        res.status(400).send('assesible problem login')
    }
})

// PRIVATE
// LOGOUT STUDENT
router.post('/api/students/logout', auth, async (req, res) => {
    try {
        req.student.tokens = req.student.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.student.save()
        res.status(200).send('session logged out successfully')
    } catch (e) {
        res.status(400).send()
    }
})

// PRIVATE
// LOGOUT
router.post('/api/students/logoutall', auth, async (req, res) => {
    try {
        req.student.tokens = []
        await req.student.save()
        res.send('all sessions logged out successfully')
    } catch (e) {
        res.status(400).send()   
    }
})


// UPDATE A STUDENT
router.patch('/api/students/me', auth, async (req, res) => {
    const allowedUpdates = ['firstname', 'password', 'lastname', 'gender', "username", "email"];
    const updates = Object.keys(req.body);
    const isValid = updates.every(update => allowedUpdates.includes(update))
    if (isValid === false) {
        return res.status(400).send( "Invalid updates")
    }
    try {
        updates.forEach((update) => req.student[update] = req.body[update])
        const updatedStudent = await req.student.save()
        res.status(200).send(updatedStudent)
    } catch (err) {
        res.status(400).send(err)
    }
})

// DELETE STUDENT
router.delete('/api/students/me', auth, async (req, res) => {
    try {
        await req.student.remove()
        res.status(200).send(`${req.student} was deleted successfully!!!`)
    } catch (err) {
        res.status(400).send(err)
    }
})
  
module.exports = router;