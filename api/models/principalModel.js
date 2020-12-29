const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;
const principalSchema = new Schema({
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
    teachers: [String],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
    // classId,
    // joinedAt
})

principalSchema.methods.toJSON = function () {
    const principal = this;
    const principalObject = principal.toObject();
    
    delete principalObject.password
    delete principalObject.tokens

    return principalObject;
}

principalSchema.methods.generateAuthToken = async function () {
    const principal = this;
    const token = jwt.sign({ _id: principal._id.toString() }, 'thisismynewcourse' );

    principal.tokens = principal.tokens.concat({ token })

    await principal.save()

    return token;
}

// principalSchema.methods.generateAuthToken = async function () {
//     const principal = this;
//     const token = jwt.sign({ _id: principal._id.toString() }, 'thisismynewcourse');

//     principal.tokens = principal.tokens.concat({ token })
//     await principal.save()

//     return token;
// }

principalSchema.statics.findByCredentials = async (email, password) => {
    const principal = await Principal.findOne({ email });
    if (!principal) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, principal.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return principal;
}

principalSchema.pre('save', async function (next) {
    const principal = this;
    if (principal.isModified('password')) {
        principal.password = await bcrypt.hash(principal.password, 8)
    }        
    next()
})

const Principal = mongoose.model('Principal', principalSchema);

module.exports = Principal;