const {Schema,model,Types} = require('mongoose')


const schema = new Schema({
    message:{type:String},
    userName:{type:String},
    avatar:{type:String}
})


module.exports = model('Message',schema)