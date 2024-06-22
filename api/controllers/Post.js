const Listing = require("../models/Post");

module.exports.index = async (req, res) => {
  let alllistings = await Listing.find({});
  
  res.json({ posts: alllistings });
  
};


module.exports.createNewPosts = async (req, res) => {
    
    
    const {url, description,user } = req.body;
    const listing =  new Listing({
      image:url,
      description:description,
      likes:0

    })
  console.log(url,description,user);
    let value = await listing.save()
    res.json({ success: "Post created successfully", newpost:value });
    
}

module.exports.destroy = async (req,res)=>{
  const {id} = req.body;
  let deletedlisting = await Listing.findByIdAndDelete(id);
  console.log(deletedlisting);
}

module.exports.updateListing = async (req,res)=>{
  let {id,url,description} = req.body;
  let listing = await Listing.findByIdAndUpdate(id,{
    image:url,
    description:description
  });
  res.json({success:"Listing updated successfully",listing});
   
}
module.exports.addlikes = async (req,res)=>{
  const { postId } = req.body;
    const post = await Listing.findById(postId);
  try {
    post.likes += 1;  
    await post.save();
    res.status(200).json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update like count' });
  }

}

