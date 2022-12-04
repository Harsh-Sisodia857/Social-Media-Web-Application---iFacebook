const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto')
const User = require('../models/user')

// tell passport to use a new startegy for google login
passport.use(new googleStrategy({
    clientID: "556116803064-kelhvutup4etq9s37vd3lo6mu51eupql.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
    passReqToCallback: true
},
    function (req,accessToken, refreshToken, profile, done){
    console.log("Access Token : ",accessToken);
    // find a user
    User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
        if (err) {
            console.log("Error in google strategy Passport: ", err);
            return;
        }

        // console.log(profile);
        if (user) {
            // if found set this user as req.user(login)
            return done(null, user);
        }
        else {
            // if not found, create the user and set it as req.user(sign up)
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex') // generate random password
            }, function (err, user) {
                if (err) {
                    console.log("Error in Creating User: ", err);
                    return;
                }
                return done(null, user);
            })
        }
    })
}))

module.exports = passport;