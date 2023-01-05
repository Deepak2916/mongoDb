const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose')

const errorController = require('./controllers/error');

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('63b55a83bfc2444fb564e88b')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://deepak:d89XuB87NtMe8keh@cluster0.488zwfs.mongodb.net/shop?retryWrites=true&w=majority')
.then(resutlt=>{
  User.findOne().then(user=>{
    if(!user){
     const user=new User({
    name:'deepak',
    email:'dpk@gmail.com',
    cart:{
      items:[]
    }
  })
  user.save() 
    }
  })
  
  app.listen(3000)
})
.catch(err=>console.log('err:-',err))
