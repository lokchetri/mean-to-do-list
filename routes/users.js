var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mytasklist', ['users']);

// Get All Users
router.get('/users', function(req, res, next){
    db.users.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

// Get Single User By Id
router.get('/user/:id', function(req, res, next){
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});

// Get Single User By Username
router.get('/user/name/:username', function(req, res, next){
    console.log("Get User By Username : ", req.params.username);
    db.users.findOne({username: req.params.username}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});

// Get Single User By Username
router.post('/user/authenticate', function(req, res, next){
    console.log("Get User By Username : ", req.params.username);
    db.users.findOne({username: req.params.username, password: req.params.password}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});

//Save User
router.post('/user', function(req, res, next){
    var user = req.body;
    if(!user.firstname || (!user.lastname) || (!user.username) || (!user.password)){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.users.save(user, function(err, user){
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }
});

// Delete User
router.delete('/user/:id', function(req, res, next){
    db.users.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// Update User
router.put('/user/:id', function(req, res, next){
    var user = req.body;
    var updUser = {};
    
    if(user.firstname){
        updUser.firstname = user.firstname;
    }
    if(user.lastname){
        updUser.lastname = user.lastname;
    }
    if(user.username){
        updUser.username = user.username;
    }
    if(task.password){
        updUser.password = user.password;
    }
    
    if(!updUser){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.users.update({_id: mongojs.ObjectId(req.params.id)},updTask, {}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
    }
});

module.exports = router;