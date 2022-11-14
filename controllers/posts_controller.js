const Post = require('../models/post')
const Comment = require('../models/comment')


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

module.exports.destroy = function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        console.log("req.user : ", req.user);
        // we compare id using .id instead of _id, facility provided by mongodb because of String matching req.user is String and req.user.id is also String
        if (post.user == req.user.id) {
            post.remove();
            Comment.deleteMany({ post: req.params.id }, function (err) {
                return res.redirect('back');
            })
        }
        else {
            return res.redirect('back');
        }
    })
}