const User = require('../../models/User')
const config = require('config')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fileService = require('../../services/FileService')
const File = require('../../models/File')


exports.register = async function (req, res) {
    try {
        res.header('Access-Control-Allow-Origin', "*")
        res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректный данные при регистрации'
            })
        }

        const { email, password, userName } = req.body
        console.log(req.body)

        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(400).json({ message: 'Такой пользователь уже существует' })
        }

        const candidateUserName = await User.findOne({ userName })

        if (candidateUserName) {
            return res.status(401).json({ message: 'Т пользователь уже существует' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email: email, password: hashedPassword, userName: userName,theme:'white' })

        await user.save()

        await fileService.createDir(new File({user:user.id,name:''}))

        res.status(201).json({ message: 'Пользователь создан' })
    }
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
}




exports.login = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "некорекные данные при входе в систему"
            })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' })
        }

        const isMatch = await bcrypt.compare(password, user.password)



        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль,попробуйте снова' })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )


        res.json({ token: token, userId: user.id, userName: user.userName, userEmail: user.email })
    }
    catch (e) {
        console.log(e)
    }
}


exports.users = async function (req, res) {
    try {
        const limit = Number(req.params.limit)
        const users = await User.find().limit(limit)
        console.log(req.params.limit)


        res.status(201).json(users)
    }
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
}


exports.user = async function (req, res) {
    try {
        // console.log(req.)
        const user = await User.findOne({_id:req.params.userId})
        console.log(user)


        res.status(201).json(user)
    }
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
}