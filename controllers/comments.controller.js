const Comment = require('../models/Comment')
const User = require('../models/User')


exports.commentsAdd = async (req, res) => {
    try {
        const commentTitle = req.body.text
        console.log(commentTitle) 
        
        const user = await User.findOne({_id:req.user.userId})

        const comment = new Comment({text:commentTitle,userName:user.userName,owner:req.body.postId,postOwner:req.user.userId})
        
        await comment.save()

        res.json(comment)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так сдесь' })
    }
}



exports.showCommentPost = async (req, res) => {
    try {
        const postId = req.params.postId
        console.log(postId) 
        

        const Comments = await Comment.find({owner:postId})

        

        res.json({Comments})
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так сдесь' })
    }
}


