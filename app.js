const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const Cors = require('cors')


const app = express()

app.use(Cors())

app.use(express.json({extended:true}))

app.use('/api/auth/',require('./routes/auth.routes'))


app.use('/api/',require('./routes/posts.routes'))
app.use('/api/',require('./routes/todo.routes'))



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