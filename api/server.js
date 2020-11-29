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
const router = require('./routes/studentRoutes');

//connection to localhost
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {     useNewUrlParser: true,     useCreateIndex: true })

//let uri = 'mongodb+srv://ademustexcel:judiciary@cluster0.g5s4z.mongodb.net/fcc?retryWrites=true&w=majority';
//mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true })

//app.use(cors())
app.use(express.static('public'))
app.use(router)



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})