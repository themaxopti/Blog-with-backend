const {Schema,model,Types} = require('mongoose')


const schema = new Schema({
    text:{type:String,required:true},
    userName:{type:String,required:true},
    owner:{type:Types.ObjectId,ref:'User'},
    postOwner:{type:Types.ObjectId,ref:'Post'}
})


module.exports = model('Comment',schema)