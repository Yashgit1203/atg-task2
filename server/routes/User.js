const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/User.js");

router
  .route("/signup")
  .post(userController.signUp);

router
  .route("/login")
  .post(
    passport.authenticate("local", {
      failureRedirect: "/abc",
    }),
    userController.login
  );
  router
  .route("/changepassword")
  .post(userController.changePassword)

router.get("/logout", userController.logout);
module.exports = router;
