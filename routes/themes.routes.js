const { Router } = require('express')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')


const ThemeProject = require('../models/ThemeProject')
const User = require('../models/User')

router.patch('/newThemeProject', async (req, res) => {
    try {
      
        const themeProject = await ThemeProject.User({_id:req.body.id},{theme:req.body.theme},{new:true})


        await themeProject.save()

        res.json(themeProject)


    } catch (e) {
        console.log(e, 'Не верно что-то')
    }
})



router.patch('/changeThemeUser',authMiddleware, async (req, res) => {
    try {
      
        const themeProject = await User.findOneAndUpdate({_id:req.user.userId},{theme:req.body.theme},{new:true})

        

        await themeProject.save()

        res.json(themeProject)


    } catch (e) {
        console.log(e, 'Не верно что-то')
    }
})



router.get('/getTheme',authMiddleware, async (req, res) => {
    try {
        
        const themeProject = await User.findOne({_id:req.user.userId})

        


        res.json(themeProject.theme)


    } catch (e) {
        console.log(e, 'Не верно что-то')
    }
})


module.exports = router
