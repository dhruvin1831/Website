const express = require('express');
const app = express();
const port = 80;
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contact', {useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we are connected!')
});


const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String
});


const Contact = mongoose.model('Contact', contactSchema);


// FOR SERVING STATIC FILES
app.use('/static',express.static('static'));
app.use(express.urlencoded());

// SETTING THE TEMPLATE ENGINE AS PUG
app.set('view engine', 'pug');

// SETTING THE VIEWS DIRECTORY
app.set('views',path.join(__dirname,'views'));

// ENDPOINTS

// get requests
app.get('/',  (req, res)=> {
    res.status(200).render('home.pug');
  });
app.get('/blank',  (req, res)=> {
    res.status(200).render('blank.pug');
  });
app.get('/about',  (req, res)=> {
    res.status(200).render('about.pug');
  });
app.get('/contact',  (req, res)=> {
    
    res.status(200).render('contact.pug');
  });

// post requests

app.post('/contact',  (req, res)=> {
var myData = new Contact(req.body);
myData.save().then(()=>{
  res.send('This is item is saved to the database')
}).catch(()=>{
  res.status(400).send("this item was not send to the database")
})    
  
});


app.listen(port,()=>{
    console.log(`website is running successfully on port : ${port}`);
});