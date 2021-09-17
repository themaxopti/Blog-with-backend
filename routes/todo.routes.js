const { Router } = require('express')
const router = Router()
const todosController = require('../controllers/todosController')
const authMiddleware = require('../middleware/auth.middleware')


router.post('/todos',authMiddleware, todosController.todos)
router.get('/todos/:userId?',todosController.getTodos)
router.get('/allTodos/:page?', todosController.pagination)
router.get('/alltodo', todosController.getAllTodos)
router.get('/todos/oneTodo/:todoId?',todosController.getTodo)
router.patch('/todos/doneTodo',authMiddleware,todosController.doneTodo)


module.exports = router