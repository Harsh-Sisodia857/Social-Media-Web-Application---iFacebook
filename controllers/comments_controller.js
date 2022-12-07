const Comment = require('../models/comment')
const Post = require('../models/post')
const commentsMailer = require('../mailers/comments_mailer')

module.exports.createComment = async function (req, res) {
    try {
        const post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            // console.log(comment.populate('user', 'name email'));
            comment = await comment.populate('user', 'name email')
            commentsMailer.newComment(comment);
            req.flash('success', "Comment Published");
            return res.redirect("/")
        }
        }
    catch (err) {
        req.flash("error : ", err);
        return;
    }
    }

module.exports.destroy = async function (req, res) {
    try {
        const comment = await Comment.findById(req.params.id)
            if(comment.user = req.user.id)
            {
                let PostId = comment.post;
                comment.remove();
                Post.findByIdAndUpdate(PostId, { $pull : {comments : req.params.id}})
                req.flash('success', "Comment Deleted Successfully");
                return res.redirect('back');
            } else {
                return res.redirect('back');
            }     
   }
    catch (err) {
        req.flash("error : ", err);
        return;
    }     
}