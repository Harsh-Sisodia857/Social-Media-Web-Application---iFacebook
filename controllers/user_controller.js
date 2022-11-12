const User = require('../models/user')


module.exports.profile = function (req, res) {
    res.render('userProfile', {
        title : "User Profile"
    });
}

module.exports.posts = function (req, res) {
    res.render('userProfile', {
        title : "User Posts"
    });
}

module.exports.signUp = function (req, res) {
    res.render('user_signUp', {
        title : "iFacebook | Sign-Up"
    })
}

module.exports.signIn = function (req, res) {
    res.render('user_signIn', {
        title: "iFacebook | Sign-In"
    })
}

module.exports.createUser = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("error in finding user in signing up");
            return;
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log("error in creating user while signing up");
                    return;
                }
                return res.redirect('/users/sign-in')
            })
        }
        else {
            return res.redirect('back');
        }
    })

}

module.exports.createSession = function (req, res) {
    // TODO
}