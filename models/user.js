const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path')
const AVATAR_PATH = path.join('/uploads/users/avatars') 

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required : true
    },
    name: {
        type: String,
        required : true 
    },
    avatar: {
        type: String
        
    }
}, {
    // timestamps is createdAt and updateAt
    timestamps : true
})

const storage = multer.diskStorage({
    destination: function (req, file, call_back) {
        call_back(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, call_back) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        call_back(null, file.fieldname + '-' + uniqueSuffix)
    }
});

// static functions
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;