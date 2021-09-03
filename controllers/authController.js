const User = require('../models/User')
const config = require('config')
const jwt = require('jsonwebtoken')

exports.auth = async function (req, res) {
    try {
        console.log(req.user.userId)

        const user = await User.findOne({ _id: req.user.userId })
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' })
        }
        // res.header("Access-Control-Allow-Headers","Content-Type,Authorization")

        // const token = jwt.sign(
        //     { userId: user.id },
        //     config.get('jwtSecret'),
        //     { expiresIn: '1h' }
        // )

        res.json({ userId: user.id, userName: user.userName, userEmail: user.email })
    }
    catch (e) {
        console.log(e)
    }
}


