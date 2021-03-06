const {Schema,model,Types} = require('mongoose')


const schema = new Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    userName:{type:String,required:true,unique:true},
    posts:[{type:Types.ObjectId,ref:'Post'}],
    todos:[{type:Types.ObjectId,ref:'Todo'}],
    comments:[{type:Types.ObjectId,ref:'Comment'}],
    avatar:{type:String,default:''},
    theme:{type:String}
})

module.exports = model('User',schema)