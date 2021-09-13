const { Router } = require('express')
const router = Router()
const postsController = require('../controllers/postsController')
const authMiddleware = require('../middleware/auth.middleware')
const commentController = require('../controllers/comments.controller')



router.post('/coments/addcomment',authMiddleware, commentController.commentsAdd)
router.get('/coments/:postId?', commentController.showCommentPost)






module.exports = router