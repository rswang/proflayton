//User schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    username: String,
    state: String
});

User = mongoose.model('User', userSchema);
module.exports = User;