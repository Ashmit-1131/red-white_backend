const mongoose = require("mongoose")


const blogsSchema = mongoose.Schema({
    image:{type:String},
    title:{type:String},
    description:{type:String},
    genre:{type:String},

    user:{type:String,required:true},
  pid:{type:String},
 


    

},{
    versionKey:false
})


const BlogsModel = mongoose.model("/blog",blogsSchema)

module.exports={
    BlogsModel
}