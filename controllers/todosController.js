const User = require('../models/User')
const Post = require('../models/Post')
const Todo = require('../models/Todo')
const config = require('config')
const jwt = require('jsonwebtoken')
const url = require('url')


exports.todos = async (req, res) => {
    try {
        console.log('hala')

        const user = await User.findOne({ _id: req.user.userId })
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' })
        }

        console.log('Все ок на этапе  1', req.body.todo)

        const todo = new Todo({ todo: req.body.todo, userName: user.userName, owner: req.user.userId,done:false })


        await todo.save()
        console.log('Все ок на этапе 2')

        res.status(201).json({ message: 'Todo добавленный' })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так cc' })

    }
}


exports.getTodos = async (req, res) => {
    try {
        const userId = req.params.userId
        const candidate = await Todo.find({ owner: userId })
        res.json(candidate)


    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так cc' })

    }
}


exports.getTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId
        const candidate = await Todo.findOne({ _id: todoId })
        res.json(candidate)


    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так cc' })

    }
}

exports.pagination = async (req, res) => {
    try {
        const page = req.params.page
        const limit = 5
        const offset = limit * (page - 1)
        const candidate = await Todo.find().limit(limit).skip(offset)
        res.json({ candidate, currentPage: req.params.page })


    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так сдесь' })

    }
}


exports.getAllTodos = async (req, res) => {
    try {

        const candidate = await Todo.find()
        console.log(candidate)
        res.json(candidate)


    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так сдесь' })

    }
}


exports.doneTodo = async (req, res) => {
    try {
        const userId = req.user.userId
        const todoId = req.body.todoId
        const doneTodo = req.body.doneTodo

        console.log(userId,
            todoId,
            doneTodo)

        const candidate = await Todo.findOneAndUpdate({ _id: todoId, owner: userId }, { done: doneTodo },{
            new:true
        })

        if (!candidate) {
            return res.status(201).json('Тодо не найденый')
        }

        await candidate.save()


        console.log(candidate)
        res.json({candidate,doneTodo:candidate.done})


    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так сдесь' })

    }
}