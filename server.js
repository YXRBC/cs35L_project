const express = require('express')
const commentRouter = require('./routes/comment')
const searchRouter = require('./routes/search')
const app = express()
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.urlencoded({extended: false}))
app.use('/comment', commentRouter)
app.use('/search',searchRouter)
app.get('/', (req, res)=> {
  res.send('Waiting for login')
})

app.listen(5000)