const connectToMongo = require('./db');
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const cors = require('cors');
const { eventNames } = require('./models/User');

connectToMongo()
const app = express();
const port = 5000;
app.use(cors())
app.use(express.json())



//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));// for uncoding the ur;
app.use(express.json());
//app.use(express.urlencoded());
app.get('/', (req,res)=>{
    res.send('hello myself emran')
})


app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, (req,res)=>{
    console.log(`listing to http://localhost:${port}`)
})
