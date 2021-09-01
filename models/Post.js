const {Schema,model,Types} = require('mongoose')


const schema = new Schema({
    title:{type:String,required:true},
    desc:{type:String,required:true},
    userName:{type:String,required:true}
})


module.exports = model('Post',schema)