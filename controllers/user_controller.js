const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile =async function (req, res) {
    const user = await User.findById(req.params.id)
        res.render('userProfile', {
            title: "User Profile",
            profile_user: user
        });
}


module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findByIdAndUpdate(req.params.id)
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log("Multer Error :", err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    if ((isEmptyDir(path.join(__dirname, "../uploads/users/avatars")))) {
                        fs.rmSync(path.join(__dirname,"../uploads/users"), { recursive: true, force: true });
                   }
                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }
                user.save();
                return res.redirect('back');
            })

        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
    } else {
        req.flash('error', "Unauthorized")
        return res.status(401).send('Unauthorized');
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

module.exports.destroySession = function (req, res, next) {
    req.logout();
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
    // req.logout(function (err) {
    //     if (err) {
    //         return next(err);
    //     }
    //     req.flash('success', "Logged Out Successfully");
    //     res.redirect("/");
    // });
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