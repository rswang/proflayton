//User schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    username: {type: String, unique: true},
    state: String
});

User = mongoose.model('User', userSchema);
module.exports = User;