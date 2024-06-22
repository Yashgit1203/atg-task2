
const Review = require("../models/Comment.js");
const Listing = require("../models/Post.js");

module.exports.addComment = async (req,res)=>{
    const {comment,postId} = req.body;

    let listing = await Listing.findById(postId);
    let newReview = await new Review({
        comment: comment
    });
    listing.comments.push(newReview);
    await listing.save();
    await newReview.save();
    res.json({comment:newReview.comment})
};

// module.exports.destroyComment = async(req,res)=>{
//     let {id,commentID} = req.body;
//     await Listing.findByIdAndUpdate(id,{$pull:{comments:commentID}});
//     await Review.findByIdAndDelete(commentID);


// }
module.exports.viewComment = async(req,res)=>{
    const listing = await Listing.findById(req.body.postId).populate({path:"comments"});
    res.json({allcomments:listing.comments});
}