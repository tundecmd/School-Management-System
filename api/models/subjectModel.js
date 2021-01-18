const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;