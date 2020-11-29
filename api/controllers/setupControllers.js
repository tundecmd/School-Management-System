const Student = require('../models/studentModel');

module.exports = function(app) {
    app.get('/api/setstudent', (req, res) => {
        let starterStudents = [
            {
                firstname: 'Adepoju',
                lastname: 'Lateef',
                email: 'ademustexcel@gmail.com',
                gender: 'Male',
                age: 25
            }
        ]
        try {
            Student.save()
        } catch (e) {
            throw Error('error!')
        }
    })
}