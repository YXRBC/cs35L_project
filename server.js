const express = require('express')
const loginRouter= require('./routes/index')
const commentRouter = require('./routes/comment')
const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use('/comment', commentRouter)
app.use('/',loginRouter)

app.get('/', (req, res)=> {
    res.send('waiting for homepage')
})

app.listen(3000)
