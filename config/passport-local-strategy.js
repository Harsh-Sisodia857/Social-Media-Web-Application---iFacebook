const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')


// Authentication using passport
passport.use(new LocalStrategy({
    // According to Schema, in our application it is email
    usernameField : 'email'
}, function (email, password, done) {
     // find a user and establish the identity
    User.findOne({ email: email }, function (err, user) {
        if (err) {
            console.log("Error in Finding user ---> Passport");
            return done(err);
        }

        if (!user || user.password != password) {
            console.log("!Invalid Username/Password");
            // done takes two argument first one is error and second one is Authentication if it fails then write false else the user
            return done(null, false);
        }
        return done(null,user)
    })
}
))

// serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null,user.id)
})

// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, user) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("Error in Finding user ---> Passport");
            return done(err);
        }
        return done(null, user);
    })
})

module.exports = passport;