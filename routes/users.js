var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const {userSchema} = require('./schema.js')
const {url} = require('../db.js')

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
var User = mongoose.model("user",userSchema)



//register API


router.post('/regist',(req,res)=>{
  var new_user = new User({
    username: req.body.username,
    password: req.body.password,
    password2: req.body.password2
  })
    new_user.save(function(err,User){
        if(err){
            console.log("database error: fail save new user")
        }
        else{
            console.log("new user added to database")
        }
    })
    res.redirect('/login')

})

//login API
router.post('/regist',(req,res)=>{
  var new_user = new User({
    username: req.body.username,
    password: req.body.password,
  })
   router.get('/login',(req,res)=>{
       User.find({username: 'TEST1', password: 'TEST2'},function(err,response){
        if (err){
            console.log("can't find user or password incorrect")
            throw err
	    res.redirect('/login')
        }else{
	    //successful login, save the session
	    req.session.username = username
            res.redirect('/')
	}   
       })  
      })  

})











// router.post('/login', function(req, res,next) {
//   var data = {
//     username: req.body.username,
//     password: req.body.password
//   }
//   model.connect(function(db){
//     db.collection('users').find(data).toArray(function(err, docs) {
//       if(err) {
//         res.redirect('/login')
//       } else {
//         if (docs.length > 0) {
//           //successful login, save the session
//           req.session.username = data.username
//           res.redirect('/')
//         } else {
//           res.redirect('/login')
//         }
//       }
//     })
//   })
// })


module.exports = router;
