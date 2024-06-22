const Listing = require("../models/Post");

module.exports.index = async (req, res) => {
  try {
    let allListings = await Listing.find({});
    res.json({ posts: allListings });
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
};

module.exports.createNewPosts = async (req, res) => {
  const { url, description } = req.body;
  
  try {
    const listing = new Listing({
      image: url,
      description: description,
      likes: 0
    });

    let newValue = await listing.save();
    res.status(201).json({ success: "Post created successfully", newpost: newValue });
  } catch (error) {
    console.error("Error creating new post:", error);
    res.status(500).json({ error: "Failed to create new post" });
  }
};

module.exports.destroy = async (req, res) => {
  const { id } = req.body;
  
  try {
    let deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    console.log("Deleted listing:", deletedListing);
    res.json({ success: "Listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ error: "Failed to delete listing" });
  }
};

module.exports.updateListing = async (req, res) => {
  let { id, url, description } = req.body;
  
  try {
    let listing = await Listing.findByIdAndUpdate(
      id,
      { image: url, description: description },
      { new: true } // Return the updated document
    );

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    res.json({ success: "Listing updated successfully", listing });
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ error: "Failed to update listing" });
  }
};

module.exports.addlikes = async (req, res) => {
  const { postId } = req.body;
  
  try {
    const post = await Listing.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.likes += 1;
    await post.save();

    res.status(200).json({ likes: post.likes });
  } catch (error) {
    console.error("Error adding likes:", error);
    res.status(500).json({ error: "Failed to update like count" });
  }
};
