const express = require("express");
const router = express.Router({mergeParams:true});
const reviewController = require("../controllers/Comment.js");

//Comment post route

router.post("/comment",reviewController.addComment)
router.post("/comment/all",reviewController.viewComment)

//Comment Delete Route
router.post("/comment/delete",reviewController.destroyComment);

module.exports = router;