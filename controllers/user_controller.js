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