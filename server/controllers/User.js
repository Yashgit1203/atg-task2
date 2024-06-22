const User = require("../models/User.js");

module.exports.signUp = async (req, res) => {
    try {
      const {username ,email ,password} = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
     
      res.json({ message: 'User Signup!', redirect: '/posts', user:req.user });
    }catch(e){
        console.log(e.message);
    }
};
module.exports.login = async (req, res) => {
    console.log("Login Success!");
    res.json({ message: 'User Login!', redirect: '/posts', user:req.user });
  };
  module.exports.logout = (req, res, next) => {
    req.logout((err) => {
      if (err) {
       console.log(err);
      } else {
        console.log("success You are logged out!");
        res.json({ message: 'User logout!', redirect: '/posts' });
      }
    });
  };
  

module.exports.changePassword = async (req, res) => {
    const { username, oldpassword, newpassword } = req.body;
    try {
        // Find the user by username
        const user = await User.findOne( username );
        if (!user) {
            return res.json({ message: 'User not found!' });
        }
        // Use the changePassword method from passport-local-mongoose
        user.changePassword(oldpassword, newpassword, (err) => {
            if (err) {
                console.error(err);
                return res.json({ message: 'Error changing password!' });
            }
            console.log("Password changed successfully");
            res.json({ message: 'Password changed successfully!' });
        });
    } catch (e) {
        console.error(e.message);
        res.json({ message: 'Error changing password!' });
    }
};
