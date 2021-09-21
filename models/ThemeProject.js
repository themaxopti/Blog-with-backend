const {Schema,model,Types} = require('mongoose')


const schema = new Schema({
    theme:{type:String,default:'white'}
})


module.exports = model('ThemeProject',schema)