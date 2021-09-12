const { Router } = require('express')
const router = Router()
const usersController = require('../controllers/usersConroller/usersController')


router.get('/users/:limit?', usersController.users)
router.get('/user/currentUser/:userId?',usersController.user)
// router.get('/todos/oneTodo/:todoId?',todosController.getTodo)


module.exports = router