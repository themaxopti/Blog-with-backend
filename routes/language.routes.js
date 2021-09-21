const { Router } = require('express')
const router = Router()
const Language = require('../models/Language')
const LanguageProject = require('../models/LanguageProject')

router.post('/language', async (req, res) => {
    try {
        console.log('==========')
        const { language,
            mainTitleText,
            postPageText,
            usersPageText,
            profilePageText,
            todosPageText,
            todoPageText,
            registerAndLoginPageText, popOver } = req.body

        if (!language || !mainTitleText || !postPageText || !usersPageText) {
            return res.status(400).json('Вы ввели нокоректные данные')
        }

        const languageApp = new Language({
            language,
            mainTitleText,
            postPageText,
            usersPageText,
            profilePageText,
            usersPageText,
            todosPageText,
            todoPageText,
            registerAndLoginPageText,
            popOver
        })

        await languageApp.save()

        res.json(languageApp)

    } catch (e) {
        console.log(e, 'Не верно что-то')
    }
})


router.patch('/language', async (req, res) => {
    try {
        console.log('==========')
        const { id, lang } = req.body

        if (!id || !lang) {
            return res.status(400).json({ message: 'вы не ввели id' })
        }

        const language = await Language.findOneAndUpdate({ _id: id }, { $push: { mainTitleText: lang } }, { new: true })

        if (!language) {
            return res.status(400).json('Не найдено')
        }

        await language.save()

        res.json(language)

    } catch (e) {
        console.log(e, 'Не верно что-то-nj')
    }
})


router.post('/language/set', async (req, res) => {
    try {
        const languageProject = new LanguageProject({ language: req.body.languageProject })

        await languageProject.save()

        res.json(languageProject)
    } catch (e) {
        console.log(e)
    }


})



router.patch('/language/set/:LanguageProject?/:id?', async (req, res) => {
    try {
        const languageProject = await LanguageProject.findOneAndUpdate({_id:req.params.id},{language:req.params.LanguageProject},{new:true})

        await languageProject.save()

        res.json(languageProject)
    } catch (e) {
        console.log(e)
    }
})



router.get('/language/get/:id?', async (req, res) => {
    try {
        const languageProject = await LanguageProject.findById(req.params.id)


        res.json(languageProject.language)
    } catch (e) {
        console.log(e)
    }
})




router.get('/language/:leng?', async (req, res) => {
    try {
        console.log('==========')
        const { leng } = req.params


        const language = await Language.findOne({ language: leng })

        if (!language) {
            return res.status(400).json({statusCode:200})
        }


        res.json(language)

    } catch (e) {
        console.log(e, 'Не верно что-то-nj')
    }
})


module.exports = router