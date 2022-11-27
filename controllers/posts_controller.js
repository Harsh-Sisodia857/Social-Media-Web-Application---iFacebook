const Post = require('../models/post')
const Comment = require('../models/comment')


module.exports.createPost = async function (req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            //user comes from req.locals.user
            user: req.user._id
        })
        //if request is ajax request, type of ajax request is xml Http request(xhr)
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post,                   
                },
                message : "Post Created!"
            })
        }

        req.flash('success', "Post Created");
        return res.redirect('back');
    } catch (err) {
        req.flash('error', err);
        return;
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id)
        console.log("req.user : ", req.user);
        // we compare id using .id instead of _id, facility provided by mongodb because of String matching req.user is String and req.user.id is also String
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id })
            req.flash('success',"Post Deleted")
            return res.redirect('back');
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