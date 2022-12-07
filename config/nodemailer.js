const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// this part sends email
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com", 
    port: 587,
    secure: false,
    auth: {
        user: 'mdharsh64503@gmail.com',
        pass: 'uqptnhhgxbtmvmxf'
    }
});

// html email
let renderTemplate = (data, relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {
            if (err) {
                console.log("Error in Rendering Template",err);
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter,
    renderTemplate
}