const { Router } = require('express')
const router = Router()
const postsController = require('../controllers/postsController')
const authMiddleware = require('../middleware/auth.middleware')


router.post('/posts',authMiddleware, postsController.posts)
router.get('/posts/:userId?', postsController.getPosts)
router.get('/posts/onePost/:postId?', postsController.getPost)


module.exports = router