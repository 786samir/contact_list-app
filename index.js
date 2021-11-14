const express = require('express');
const path = require('path');
const port = 8000;


const db = require('./config/mongoose');
const Contact = require('./models/contact')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

app.use(express.static('assets'));

var contactList = [
    {
    name: "samir",
    phone: "77777777"
    },
    {
    name: "Tony Stark",
    phone: "123457890"
    },
    {
        name: "Coding Ninja",
        phone: "4584153464"
    }
]

app.get('/', function(req, res){
   
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            retturn;
        }
        return res.render('home',{
            title: "My Contacts List",
            contact_list: contacts
          });
    });
  
});

app.get('/practice', function(req, res){
    return res.render('practice',{
        title: "Let us play with ejs"
    });
});

app.post('/create-contact', function(req, res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log('error in creating contact');
        return; };
       console.log('******', newContact);
       return res.redirect('back');
    }
    )

});

app.get('/delete-contact/', function(req, res){
   // get the id from query in the list
    let id = req.query.id;


   Contact.findByIdAndDelete(id, function(err){
       if(err){
           console.log('error in deleting');
           return;
       }
   });

    return res.redirect('back');
});

app.listen(port, function(err){
    if(err){
        console.log('error', err)
    }

    console.log('Yup! My express server i running on port:', port)
})