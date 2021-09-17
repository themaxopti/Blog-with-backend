const fileService = require('../../services/FileService')
const User = require('../../models/User')
const File = require('../../models/File')
const UUid = require('uuid')
const config = require('config')
const fs = require('fs')


class FileController {
    async createDir(req, res) {
        try {
            const { name, type, parent } = req.body
            const file = new File({ name, type, parent, user: req.user.userId })
            const parentFile = await File.findOne({ _id: parent })
            if (!parentFile) {
                file.path = name
                await fileService.createDir(file)
            } else {
                file.path = `${parentFile.path}\\${file.name}`
                await fileService.createDir(file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }

            await file.save()
            return res.json(file)

        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }



    async uploadAvatar(req, res) {
        try {
            console.log('===========')
            const file = req.files.avatar
            const avatarName = UUid.v4() + '.jpg'
            file.mv(config.get('staticPath') + '\\' + avatarName)
            const user = await User.findOneAndUpdate({_id:req.user.userId},{avatar:avatarName},{new:true})
            console.log(user)
            await user.save()
            return res.json(avatarName)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }



    async deleteAvatar(req, res) {
        try {
            const user = await User.findById(req.user.userId)

            
            fs.unlinkSync(config.get('staticPath') + '\\' + user.avatar)
            user.avatar = null
            await user.save()
            return res.json(user)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }
}

module.exports = new FileController()