const ws = require('ws')
const Message = require('./models/Message')
const Posts = require('./models/Post')

const wss = new ws.Server({
    port: 5000,
}, () => console.log('Сервер запущен'))



wss.on('connection', function connection(ws) {
    ws.on('message', async function (message) {

       
        message = JSON.parse(message)
        
        

        // const newMessage = new Message()
        // await newMessage.save()
        switch (message.event) {
            case "message":
                
                broadcastMessage(message)
                break

            case "connection":
                broadcastMessage(message)

                break
            default:
                break
        }
    })
})

async function broadcastMessage(messageI) {
    try{
        
        // console.log( messageI.userName,messageI.message)
   
        wss.clients.forEach(client => {
            client.send(JSON.stringify(messageI))
        })
    
        const posts = await Posts.find()
        console.log( posts)
    }catch (e){
        console.log(e)
    }
   
}

const message = {
    event: 'message/connection',
    id: 123,
    date: '21.01.2021',
    userName: 'Ulbi Tv',
    message: ''
}