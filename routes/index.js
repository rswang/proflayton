var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/users/:username', function(req, res) {
    User.findOne({username: req.params.username}, function(err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send(user);
    })
});

router.post('/users', function(req, res) {
    User.create({username: req.body.username, state: req.body.state}, function(err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send(user);
    })
});


router.put('/users/:username', function(req, res) {
    User.findOne({username: req.params.username}, function(err, user) {
        user.set('state', req.body.state);
        user.save(function(err, user) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(200).send(user);
        });
    });
});

module.exports = router;
