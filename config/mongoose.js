const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/iFacebook_development")

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MONGODB"))
db.once('open', function () {
    console.log("Connecting to the Database : Mongodb");
})

module.exports = db;