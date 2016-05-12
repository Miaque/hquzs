/**
 * User模型
 * Created by Miaque on 2016/5/8.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchame = new Schema({
    username : {type : String, unique : true},
    email : String,
    password : String,
    city : String
});
mongoose.model('User', UserSchame);
