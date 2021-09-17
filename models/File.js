const {Schema,model,Types} = require('mongoose')


const schema = new Schema({
    name:{type:String,required:true},
    type:{type:String,required:true},
    accesLink:{type:String},
    size:{type:Number},
    path:{type:String,default:''},
    user:{type:Types.ObjectId,ref:'User'},
    parent:{type:Types.ObjectId,ref:'File'},
    childs:[{type:Types.ObjectId,ref:'File'}]
})


module.exports = model('File',schema)