const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment:String,
    date:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})
let Comment  = mongoose.model("Comment",commentSchema);
module.exports = Comment;