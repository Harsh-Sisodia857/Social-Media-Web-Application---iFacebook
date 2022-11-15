const User = require('../models/user')


module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        res.render('userProfile', {
            title: "User Profile",
            profile_user : user
        });
       
   })
}

module.exports.update = function (req, res) {
    if (req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
            return res.redirect('back');
        })
    }
    else {
        return res.status(401).send('Unauthorized')
    }
}


module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
       return res.redirect('/users/profile');
    }
    res.render('user_signUp', {
        title : "iFacebook | Sign-Up"
    })
}

module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
       return res.redirect('/users/profile');
    }
    res.render('user_signIn', {
        title: "iFacebook | Sign-In"
    })
}

module.exports.destroySession = function (req, res,next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};

// creating user
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

// Sign in and create session
module.exports.createSession = function (req, res) {
    return res.redirect('/');
}