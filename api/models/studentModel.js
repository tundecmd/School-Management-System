const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;
const studentSchema = new Schema({
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
        trim: true,
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
    // classId,
    // joinedAt
})

studentSchema.methods.toJSON = function () {
    const student = this;
    const studentObject = student.toObject();

    delete studentObject.password
    delete studentObject.tokens 
    
    return studentObject;
}

studentSchema.methods.generateAuthToken = async function () {
    const student = this;
    const token = jwt.sign({ _id: student._id.toString() }, 'thisismynewcourse');

    student.tokens = student.tokens.concat({ token })
    await student.save()

    return token;
}

studentSchema.statics.findByCredentials = async (email, password) => {
    const student = await Student.findOne({ email });
    if (!student) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
        throw new Error('Unable to login')
    } 
    return student;
}
// hash the plain text password before saving
studentSchema.pre('save', async function (next) {
    const student = this;
    if (student.isModified('password')) {
        student.password = await bcrypt.hash(student.password, 8)
    }
    next()
})
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;


// studentSchema.methods.getPublicProfile = function () {
//     const student = this;
//     const studentObject = student.toObject();

//     delete studentObject.password
//     delete studentObject.tokens 
    
//     return studentObject;
// }