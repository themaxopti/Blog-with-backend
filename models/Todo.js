const {Schema,model,Types} = require('mongoose')


const schema = new Schema({
    todo:{type:String,required:true},
    userName:{type:String,required:true},
    owner:{type:Types.ObjectId,ref:'User'}
})


module.exports = model('Todo',schema)