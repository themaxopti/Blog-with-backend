const { Router } = require('express')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')
const Message = require('../models/Message')


router.post('/messages', async (req, res) => {
    const { message, userName, avatar } = req.body


    const messages = new Message({ message: message, userName: userName, avatar: avatar })
    await messages.save()

    res.json(messages)
})




router.get('/messages', async (req, res) => {
    const messages = await Message.find()

    res.json(messages)
})





module.exports = router