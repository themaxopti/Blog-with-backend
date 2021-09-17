const { Router } = require('express')
const fileController = require('../controllers/fileController/fileController')
const router = Router()
 
const authMiddleware = require('../middleware/auth.middleware')


router.post('',authMiddleware,fileController.createDir)
router.post('/avatar',authMiddleware,fileController.uploadAvatar)
router.delete('/avatar',authMiddleware,fileController.deleteAvatar)


module.exports = router