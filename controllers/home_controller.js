const Post = require('../models/post')
const User = require('../models/user')


module.exports.home = function (req, res) {
    // model of post --------------------------------------------------------------------------
    // const postSchema = new mongoose.Schema({
    //     content: {
    //         type: String,
    //         required: true
    //     },
    //     user: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User'
    //     },
    //     // include the array of ids of all comments in this post schema
    //     comments: [
    //         {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: 'Comment'
    //         }
    //     ]
    // }, {
    //     timestamps: true
    // })
    // -------------------------------------------------------------------------
    // from post first we populate the user(fetch the user detail using its id) then we populate the comments and also show showing  the user's name who comment for that we also populate user from the comment
    Post.find({}).populate('user').populate({
        path: 'comments',
        populate: {
            path : 'user'
        }
    }).exec(function (err, posts) {
        User.find({}, function (err, users) {
            return res.render('home', {
                title: "Home",
                posts,
                all_users : users
            });
            
        })
    })
}