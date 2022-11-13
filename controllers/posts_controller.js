const Post = require('../models/post')

module.exports.createPost = function (req, res) {
    console.log("Create Post is Called :");
    Post.create({
        content: req.body.content,
        //user comes from req.locals.user
        user : req.user._id
    }, function (err, post) {
        if (err) {
            console.log("error in creating Post", err);
            return;
        }
        console.log(post);
        return res.redirect('back');
    })
}