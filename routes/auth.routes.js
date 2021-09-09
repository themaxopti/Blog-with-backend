const { Router } = require('express')

const userController = require('../controllers/usersConroller/usersController')
const authController = require('../controllers/authController')
const router = Router()
const { check, validationResult } = require('express-validator')

const authMiddleware = require('../middleware/auth.middleware')

const config = require('config')
const mongoose = require('mongoose')

router.post('/register',
    [
        check('email', 'Некоректный емейл').isEmail(),
        check('userName', 'Минимальная длина пароля 3 символов').isLength({ min: 3 })

    ], userController.register)



router.post('/login',
    [
        check('email', 'Введите корректный емейл').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()

    ], userController.login)



router.get('/authUser',authMiddleware, authController.auth)





module.exports = router