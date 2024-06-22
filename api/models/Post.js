const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    description :String,
    image :{
       type:String,
    },
    likes:Number,
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
})

let Post  = mongoose.model("Post",postSchema);
module.exports = Post;