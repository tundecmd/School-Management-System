const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;
const teacherSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    username: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        required: true,
    },
    salary: {
        type: String,
        required: true
    },
    students: [String],
    // classId,
    // joinedAt
})
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;