const config = require('config')
const jwt = require('jsonwebtoken')
const { model } = require('mongoose')


module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log()
        if(!token) {
            return res.status(401).json({message:'Вы не авторизованы'})
        }

        const decoded = jwt.verify(token,config.get('jwtSecret'))
        console.log(decoded)

        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({message:'Что-то пошло не так'})

    }

}