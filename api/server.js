const express = require('express')
const app = express()
//const cors = require('cors');
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

//connection to localhost
mongoose.connect('mongodb://127.0.0.1:27017/school-management-system-api', {
          useNewUrlParser: true, 
          useCreateIndex: true, 
          useUnifiedTopology: true, 
          useFindAndModify: false 
        })

//let uri = 'mongodb+srv://ademustexcel:judiciary@cluster0.g5s4z.mongodb.net/fcc?retryWrites=true&w=majority';
//mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true })

//app.use(cors())
app.use(express.static('public'))


// Goal: Setup middleware for maintenance mode
//
// 1. Register a new middleware function
// 2. Send back a maintenance message with a 503 status code
// 3. Try your requests from the server and confirm status/message shows

// app.use((req, res, next) => {
//   res.status(503)
//       .send(`Mad Scientists at work. This site is currently under maintenance! 
//            We are sorry the incoveniences. Check back soon`)  
//   next()
// })

app.use(studentRouter)
app.use(teacherRouter)
app.use(principalRouter)
app.use(managerRouter)

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})