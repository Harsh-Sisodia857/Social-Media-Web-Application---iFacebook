const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({comment : comment},'/comment/new_comment.ejs')
    console.log('Inside new comment mailer');
    nodemailer.transporter.sendMail({
        from: "mdharsh64503@gmail.com",
        to: comment.user.email,
        subject: "New Comment Published",
        html : htmlString
    }, (err, info) => {
        if (err) {
            console.log("error in sending mail",err);
            return;
        }
        console.log("Message send",info);
        return;
    })
}

