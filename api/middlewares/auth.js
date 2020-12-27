const jwt = require('jsonwebtoken');
const Student = require('../models/studentModel');


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'thisismynewcourse') 
        const student = await Student.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!student) {
            throw new Error()
        }
        req.student = student;
        req.token = token;
        next()
    } catch (e) {
        res.status(401).send({ error: 'please authenticate!!!'})
    }
}
module.exports = auth