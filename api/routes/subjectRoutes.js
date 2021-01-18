const express = require('express');
const Subject = require('../models/subjectModel');
const app = express()
const router = new express.Router();
const auth = require('../middlewares/authStudent');

// READ SUBJECTS
// router.get('/api/subjects/me', auth, async (req, res) => {
//     //  const subjects = Subject.find({});
//     //const newStudent = new Student()
//     //console.log(req.student)
//     res.send(req.student)
// })


// CREATE A SUBJECT
router.post('/api/subjects', auth, async (req, res) => {
    console.log('11111111')
    const newSubject = new Subject({
        ...req.body,
        owner: req.student._id
    })
    console.log('22222222222')
    try {
        console.log('3333333')
        await newSubject.save()
        console.log('444444444')
        res.status(201).send({newSubject})
        console.log('55555555')
    } catch (err) {
        res.status(400).send(err)
    }
})


// UPDATE A STUDENT
// router.patch('/api/students/me', auth, async (req, res) => {
//     const allowedUpdates = ['firstname', 'password', 'lastname', 'gender', "username", "email"];
//     const updates = Object.keys(req.body);
//     const isValid = updates.every(update => allowedUpdates.includes(update))
//     if (isValid === false) {
//         return res.status(400).send( "Invalid updates")
//     }
//     try {
//         updates.forEach((update) => req.student[update] = req.body[update])
//         const updatedStudent = await req.student.save()
//         res.status(200).send(updatedStudent)
//     } catch (err) {
//         res.status(400).send(err)
//     }
// })

// DELETE STUDENT
// router.delete('/api/students/me', auth, async (req, res) => {
//     try {
//         await req.student.remove()
//         res.status(200).send(`${req.student} was deleted successfully!!!`)
//     } catch (err) {
//         res.status(400).send(err)
//     }
// })
  
module.exports = router;