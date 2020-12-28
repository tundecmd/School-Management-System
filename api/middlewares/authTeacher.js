const jwt = require('jsonwebtoken');
const Teacher = require('../models/teacherModel');


const authTeacher = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'thisismynewcourse');
        const teacher = await Teacher.findOne({ _id: decoded._id, 'tokens.token': token })
        //console.log(decoded)
        if (!teacher) {
            throw new Error()
        }
        req.teacher = teacher;
        req.token = token;
        next()
    } catch (e) {
        res.status(401).send({ error: 'please authenticate!!!'})
    }
}
module.exports = authTeacher;