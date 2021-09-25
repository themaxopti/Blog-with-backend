const { Router } = require('express')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')
const Message = require('../models/Message')
const Todo = require('../models/Todo')
const Post = require('../models/Post')
const User = require('../models/User')


router.post('/find', async (req, res) => {
    try {
        const { find } = req.body
        const findOneLetter =   find.substr(0, 1)
        let re = new RegExp("^" + findOneLetter )



        const user = await User.find({ userName: re })


        const post = await Post.find({ title: re })


        const todo = await Todo.find({ todo: re })


    
        if (todo || post || user) {
            res.json({ todo, post, user })
        }

        res.json({ message: "НЕ найдено" })
    } catch (e) {
        console.log(e)
    }

})





module.exports = router