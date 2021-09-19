const { Schema, model, Types } = require('mongoose')


const schema = new Schema({
    language: { type: String },
    mainTitleText: {
        categories: {
            posts:{type:String},
            users:{type:String},
            profile:{type:String},
            register:{type:String},
            login:{type:String},
            logout:{type:String},
            usersTodos:{type:String}
        },
        cards: {
            posts: {
                posts:{type:String},
                text:{type:String}
            },
            users:{
                users:{type:String},
                text:{type:String}
            } ,
            todos: {
                todos:{type:String},
                text:{type:String}
            }
        },
        usersSlider:{type:String},
        todoSlider:{type:String},
        footer:{
            about:{type:String},
            contacts:{type:String}
        }
    },  
    postPageText: {
        post:{
            postTitle:{type:String},
            postDescription:{type:String},
            userName:{type:String}
        },
        comments:{
            name:{type:String},
            email:{type:String},
            body:{type:String},
            add:{type:String}
        }
    },
    usersPageText: {
        users:{type:String},
        showMore:{type:String}
    },
    profilePageText: {
        email:{type:String},
        house:{type:String},
        posts:{
            allPosts:{type:String},
            addPost:{type:String},
            post:{
                title:{type:String},
                name:{type:String},
                desc:{type:String},
                showMore:{type:String}
            }
        },
        todos:{
            allTodos:{type:String},
            addTodo:{type:String},
            todo:{
                todo:{type:String},
                name:{type:String},
            }
        }
    },
    todosPageText: {
        allTodos:{type:String},
        todo:{
            todo:{type:String},
            name:{type:String},
        }
    },
    todoPageText: {
        todoTitle:{type:String},
        userName:{type:String}
    },
    registerAndLoginPageText: {
        email:{type:String},
        password:{type:String},
        name:{type:String},
        register:{
            register:{type:String}
        },
        login:{
            login:{type:String}
        }
    },
    aboutAuthorText: {
        aboutAuthorAndProject:{type:String},
    },
    popOver:{
        theme:{type:String},
        language:{type:String},
        aboutProject:{type:String},
    }
})


module.exports = model('Language', schema)