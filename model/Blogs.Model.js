const mongoose = require("mongoose")


const blogsSchema = mongoose.Schema({
    title: String,
    msg: String,
    likes: Number,
    dislikes: Number,
    user:String

 


    

},{
    versionKey:false
})


const BlogsModel = mongoose.model("/blog",blogsSchema)

module.exports={
    BlogsModel
}