const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const Cors = require('cors')
const fileUpload = require('express-fileupload')

const app = express()

app.use(Cors())

app.use(express.json({extended:true}))
app.use(fileUpload({}))

app.use('/api/auth/',require('./routes/auth.routes'))


app.use('/api/',require('./routes/posts.routes'))
app.use('/api/',require('./routes/language.routes'))
app.use('/api/',require('./routes/todo.routes'))
app.use('/api/',require('./routes/users.routes'))
app.use('/api/',require('./routes/comments.routes'))
app.use('/api/files/',require('./routes/file.routes'))
app.use('/api/',require('./routes/messages.routes'))
app.use('/api/',require('./routes/find.routes'))
app.use(express.static('static'))


app.use('/api',require('./routes/themes.routes'))
async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser:true,
            useUnifiedTopology:true
            // useCreateIndex:true
        })
    }
    catch (e) {
        console.log('server Error', e.message)
        process.exit(1)
    }
}

start()

const PORT = config.get('port')

app.listen(PORT,() => {console.log(`app has been started on port ${PORT}`)})