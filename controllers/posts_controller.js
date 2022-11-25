const Post = require('../models/post')
const Comment = require('../models/comment')


module.exports.createPost = async function (req, res) {
   const post = await Post.create({
        content: req.body.content,
        //user comes from req.locals.user
        user : req.user._id
    })
    console.log(post);
    return res.redirect('back');
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id)
        console.log("req.user : ", req.user);
        // we compare id using .id instead of _id, facility provided by mongodb because of String matching req.user is String and req.user.id is also String
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id })
            return res.redirect('back');
        }
        else {
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log('Error', err);
        return;
    }
}