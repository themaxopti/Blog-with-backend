const {Schema,model,Types} = require('mongoose')


const schema = new Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    userName:{type:String,required:true,unique:true}
})

module.exports = model('User',schema)