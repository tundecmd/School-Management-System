const express = require('express')
const app = express()
const cors = require('cors');
//require('dotenv').config()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const mongoose = require('mongoose')
const config = require('./config/index');
const studentRouter = require('./routes/studentRoutes');
const teacherRouter = require('./routes/teacherRoutes');
const principalRouter = require('./routes/principalRoutes');
const managerRouter = require('./routes/managerRoutes');
const subjectRouter = require('./routes/subjectRoutes');

let uri = 'mongodb+srv://ademustexcel:judiciary@cluster0.g5s4z.mongodb.net/fcc?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  })

app.use(cors())
app.use(express.static('public'))

app.use(studentRouter)
app.use(teacherRouter)
app.use(principalRouter)
app.use(managerRouter)
app.use(subjectRouter)

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})


//connection to localhost
// mongoose.connect('mongodb://127.0.0.1:27017/school-management-system-api', {
//           useNewUrlParser: true, 
//           useCreateIndex: true, 
//           useUnifiedTopology: true, 
//           useFindAndModify: false 
//         })