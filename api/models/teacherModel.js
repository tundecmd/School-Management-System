const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
    //students: [String],
    // classId,
    // joinedAt
})

teacherSchema.methods.toJSON = function () {
    const teacher = this;
    const teacherObject = teacher.toObject()

    delete teacherObject.password
    delete teacherObject.tokens

    return teacherObject
}

teacherSchema.methods.generateAuthToken = async function () {
    const teacher = this;
    const token = jwt.sign({ _id: teacher._id.toString() }, 'thisismynewcourse');

    teacher.tokens = teacher.tokens.concat({ token })
    await teacher.save()

    return token;
}

teacherSchema.statics.findByCredentials = async (email, password) => {
    const teacher = await Teacher.findOne({ email })
    if (!teacher) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
        throw new Error('Unable to login')
    } 
    return teacher;    
}


teacherSchema.pre('save', async function (next) {
    const teacher = this;
    if (teacher.isModified('password')) {
        teacher.password = await bcrypt.hash(teacher.password, 8)
    }
    next()
})
const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;