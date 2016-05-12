/**
 * 为express服务器实现处理web请求的路由
 * Created by Mique on 2016/5/8.
 */

var express = require('express');
var path = require('path');
var router = express.Router();


/*module.exports = function (app) {*/
    var users = require('../controllers/users_controller');
    router.use('/static', express.static('public'))/*.use('/lib', express.static('../lib'))*/;

    router.get('/', function (req, res) {
        if (req.session.user) {
            res.render('enrolInfo', {
                username: req.session.username
            });
            /*res.sendFile(path.join(__dirname, '../views/_index.html'));*/
        } else {
            req.session.msg = 'Access denied!';
            res.render('index');
        }
    });
    router.get('/user', function (req, res) {
        if (req.session.user) {
            /*res.render('user', {msg: req.session.msg});*/
            res.sendFile(path.join(__dirname, '../views/_user.html'))
        } else {
            req.session.msg = 'Access denied!';
            res.redirect('/login');
        }
    });
    router.get('/signup', function (req, res) {
        if (req.session.user) {
            res.render('enrolInfo');
        }
        res.render('signup'/*, {msg: req.session.msg}*/);
        /*res.sendFile(path.join(__dirname, '../views/_signup.html'));*/
    });
    router.get('/login', function (req, res) {
        if (req.session.user) {
            res.render('enrolInfo');
        }
        res.render('login'/*, {msg: res.session.msg}*/);
        /*res.send({msg : res.session.msg});*/
        /*res.sendFile(path.join(__dirname, '../views/_login.html'));*/
    });
    router.get('/logout', function (req, res) {
        req.session.destroy(function () {
            res.redirect('/');
        });
    });
    router.get('/enrolInfo', function (req, res) {
        if (req.session.user) {
            res.render('enrolInfo', {username: req.session.username});
        } else {
            res.redirect('/login');
        }
    });
    router.get('/majorRecommend', function (req, res) {
        if (req.session.user) {
            res.render('majorRecommend', {username: req.session.username});
        } else {
            res.redirect('/login');
        }
    });
    router.get('/enterForecast', function (req, res) {
        if (req.session.user) {
            res.render('enterForecast', {username: req.session.username});
        } else {
            res.redirect('/login');
    }
});
    router.post('/signup', users.signup);
    router.post('/user/update', users.updateUser);
    router.post('/user/delete', users.deleteUser);
    router.post('/login', users.login);
    router.get('/user/profile', users.getUserProfile);
/*}*/
module.exports = router;
