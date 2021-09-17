const fs = require('fs')
const config = require('config')
const File = require('../models/File')


class FileService {

    createDir(file) {
        const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`
        return new Promise((res, rej) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return res({ message: 'File was created' })
                } else {
                    return rej({ message: 'File has already exist' })
                }
            } catch (e) {
                return rej({ message: 'file error' })
            }
        })
    }

}


module.exports = new FileService()