const User = require('../models/User')
const Post = require('../models/Post')
const config = require('config')
const jwt = require('jsonwebtoken')
const url = require('url')


exports.posts = async (req, res) => {
    try {
        console.log(req.body.title, 'hala')

        const user = await User.findOne({ _id: req.user.userId })
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' })
        }

        console.log('Все ок на этапе  1', req.body.desc, req.body.title)

        const post = new Post({ title: req.body.title, desc: req.body.desc, userName: user.userName, owner: req.user.userId })


        await post.save()
        console.log('Все ок на этапе 2')

        res.status(201).json({ message: 'Пост добавленный' })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так cc' })

    }
}


exports.getPosts = async (req, res) => {
    try {
        const userId = req.params.userId
        const candidate = await Post.find({owner:userId})
        res.json(candidate)


    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так cc' })

    }
}


exports.getPost = async (req, res) => {
    try {
        const postId = req.params.postId
        const candidate = await Post.findOne({_id:postId})
        console.log(candidate)
        res.json(candidate)


    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так cc' })

    }
}




exports.getAllPosts = async (req, res) => {
    try {
      
        const candidate = await Post.find()
        console.log(candidate)
        res.json(candidate)


    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так сдесь' })

    }
}


exports.pagination = async (req, res) => {
    try {
        const page = req.params.page
        const limit = 5
        const offset = limit * (page - 1)
        const candidate = await Post.find().limit(limit).skip(offset)
        res.json({candidate,currentPage:req.params.page})


    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так сдесь' })

    }
}