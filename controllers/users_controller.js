/**
 * 实现与Uer模型交互的路由
 * Created by Mique on 2016/5/8.
 */
var crypto = require("crypto");
var mongoose = require('mongoose');
function hashPW(pwd) {
    return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}
User = mongoose.model('User');
exports.signup = function (req, res) {
    var user = new User({username : req.body.username});
    user.set('password', hashPW(req.body.password));
    user.set('email', req.body.email);
    user.set('city', req.body.city);
    user.save(function (err) {
        if (err){
            res.sessor.error = err;
            res.redirect('/signup');
        } else {
            req.session.user = user.id;
            req.session.username = user.username;
            req.session.msg = user.username;
            res.redirect('/enrolInfo');
        }
    });
};
exports.login = function (req, res) {
    User.findOne({username : req.body.username})
        .exec(function (err, user) {
            if (!user){
                err = 'User Not Found.'
            } else if (user.password === hashPW(req.body.password.toString())) {
                req.session.regenerate(function () {
                    req.session.user = user.id;
                    req.session.username = user.username;
                    req.session.msg = user.username;
                    res.redirect('/enrolInfo');
                });
            } else {
                err = 'Authentication failed.'
            }
            if (err){
                req.session.regenerate(function () {
                    console.log(user.password);
                    console.log(hashPW(req.body.password.toString()));
                    req.session.msg = err;
                    res.redirect('/login');
                });
            }
        })
};
exports.getUserProfile = function (req, res) {
    User.findOne({_id : req.session.user}).exec(function (err, user) {
        if (!user){
            res.json(404, {err : 'User Not Found.'})
        } else {
            res.json(user);
        }
    });
};
exports.updateUser = function (req, res) {
    User.findOne({_id : req.session.user}).exec(function (err, user) {
        user.set('email', req.body.email);
        user.set('city', req.body.city);
        user.save(function (err) {
            if (err) {
                res.sessor.error = err;
            } else {
                req.session.msg = 'User Updated.';
            }
            res.redirect('/user');
        });
    });
};
exports.deleteUser = function (req, res) {
    User.findOne({_id : req.session.user}).exec(function (err, user) {
        if (user) {
            user.remove(function (err) {
                if (err) {
                    req.session.msg = err;
                }
                req.session.destroy(function () {
                    res.redirect('/login');
                });
            });
        } else {
            req.session.msg = 'User Not Found!';
            req.session.destroy(function () {
                res.redirect('/login');
            });
        }
    });
};