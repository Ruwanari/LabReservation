const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{
    console.log('connected to database'+config.database)
});
mongoose.connection.on('error',(error)=>{
    console.log('database error'+error);
});




const app = express();
const port = 3000;
const users = require('./routes/users');
const labs = require('./routes/labs');
const reservations = require('./routes/reservations');

app.use(cors());

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);
app.use('/labs',labs);
app.use('/reservations',reservations);
 
app.get('/',(req,res)=>{

  res.send('invalid endpoint');
});

 app.listen(port,()=>{
    console.log('server started on port'+port);

 });

    

