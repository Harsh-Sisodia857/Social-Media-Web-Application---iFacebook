const User = require('../models/user')


module.exports.profile =async function (req, res) {
    const user = await User.findById(req.params.id)
        res.render('userProfile', {
            title: "User Profile",
            profile_user: user
        });
}

module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        await User.findByIdAndUpdate(req.params.id, req.body)
        req.flash('success', "Updated Successfully");
        return res.redirect('back')
    }
    else {
        req.flash('error',"Unauthorized")
        return res.status(401)
    }
}


module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        req.flash('success', "Signed Up Successfully");
       return res.redirect('/users/profile');
    }
    res.render('user_signUp', {
        title : "iFacebook | Sign-Up"
    })
}

module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        req.flash('success', "Signed In Successfully");
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
        req.flash('success', "Logged Out Successfully");
        res.redirect("/");
    });

};

// creating user
module.exports.createUser =async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log("error in creating user while signing up");
                    return;
                }
                return res.redirect('/users/sign-in')
            })
            req.flash('success', "Account Created Successfully");

        }
        else {
            return res.redirect('back');
        }
    }
    catch (err) {
        req.flash('error', err);
        return;
    }
}

// Sign in and create session
module.exports.createSession = function (req, res) {
    req.flash('success', "Logged In Successfully");
    return res.redirect('/');
}