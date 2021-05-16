const express = require('express')
const commentRouter = require('./routes/comment')
const searchRouter = require('./routes/search')
const app = express()
const path = require('path');

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}))
app.use('/comment', commentRouter)
app.use('/search',searchRouter)
app.get('/', (req, res)=> {
  res.send('Waiting for login')
})

app.listen(5000)