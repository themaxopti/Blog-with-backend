const { Router } = require('express')
const router = Router()
const postsController = require('../controllers/postsController')
const authMiddleware = require('../middleware/auth.middleware')




router.post('/posts',authMiddleware, postsController.posts)
router.get('/posts/:userId?', postsController.getPosts)
router.get('/posts/onePost/:postId?', postsController.getPost)
router.get('/allPosts/:page?', postsController.pagination)
router.get('/allpost', postsController.getAllPosts)





module.exports = router