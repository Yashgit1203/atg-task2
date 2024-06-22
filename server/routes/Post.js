const express = require("express");
const router = express.Router();
const postController = require("../controllers/Post.js");

router
.route("/")
.get(postController.index)
.post(
    postController.createNewPosts
  );
router
.route("/delete")
.post(postController.destroy)

router
.route("/edit")
.post(postController.updateListing)
router

router
.route("/like")
.post(postController.addlikes)
router
.route("/dislike")
.post(postController.addlikes)
module.exports = router;