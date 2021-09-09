const { Router } = require('express')
const router = Router()
const todosController = require('../controllers/todosController')
const authMiddleware = require('../middleware/auth.middleware')


router.post('/todos',authMiddleware, todosController.todos)
router.get('/todos/:userId?',todosController.getTodos)
router.get('/todos/oneTodo/:todoId?',todosController.getTodo)


module.exports = router