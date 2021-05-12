const express = require('express')
const commentRouter = require('./routes/comment')
const app = express()

app.set('view engine', 'ejs')

app.use('/comment', commentRouter)

app.get('/', (req, res)=> {
    const comment = [{
        user: 'username',
        commentAt: new Date(),
        courseComment: 'content of comment'
    }]
  res.render('comment/index', {comment: comment})  
})

app.listen(5000)