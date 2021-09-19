const {Schema,model,Types} = require('mongoose')


const schema = new Schema({
    language:{type:String}
})


module.exports = model('LanguageProject',schema)