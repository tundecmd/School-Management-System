const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;
const managerSchema = new Schema({
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
    password: {
        type: String,
        required: true,
        trim: true
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
    }
    // classId,
    // joinedAt
})
const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;