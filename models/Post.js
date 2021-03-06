const {Schema,model,Types} = require('mongoose')


const schema = new Schema({
    title:{type:String,required:true},
    desc:{type:String,required:true},
    userName:{type:String,required:true},
    owner:{type:Types.ObjectId,ref:'User'},
    comments:{type:Types.ObjectId,ref:'Comment'}
})


module.exports = model('Post',schema)