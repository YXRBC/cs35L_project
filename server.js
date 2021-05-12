const express = require('express')
const commentRouter = require('./routes/comment')
const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use('/comment', commentRouter)


app.get('/', (req, res)=> {
  res.send('Waiting for login')
})

app.listen(5000)