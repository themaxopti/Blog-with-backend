const {Schema,model,Types} = require('mongoose')


const schema = new Schema({
    message:{type:String,required:true},
    userName:{type:String,required:true},
    avatar:{type:String}
})


module.exports = model('Message',schema)