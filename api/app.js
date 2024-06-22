if (process.env.NODE_ENV === "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("./models/User.js");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);

// MongoDB URL from environment variable
const MONGO_URL = process.env.MONGO_ATLAS;

const sessionOptions = {
    secret: process.env.SECRET || 'afdsa',
    saveUninitialized: true,
    resave: false,
    store: new MongoDBStore({
        uri: MONGO_URL,
        collection: 'mySessions'
    }),
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

// Middleware configuration
app.use(session(sessionOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(cors());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MongoDB connection
async function main() {
    try {
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to DB");
    } catch (err) {
        console.error("Error connecting to DB:", err);
        process.exit(1); // Exit the process with a failure code
    }
}
main();

// Routes
const postRouter = require("./routes/Post.js");
const userRouter = require("./routes/User.js");
const commentRouter = require("./routes/Comment.js");

app.use((req, res, next) => {
    res.locals.curUser = req.user; // req.user contains info when user logged in and undefined when logged out
    next();
});

app.use("/posts", postRouter);
app.use("/", userRouter);
app.use("/", commentRouter);

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// Start the server
app.listen(8080, () => {
    console.log('Server started successfully at port 8080');
});

module.exports = app;