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
router.get('/user/name/:userName', function(req, res, next){
    console.log("Get User By UserName : ", req.params.userName);
    db.users.findOne({userName: req.params.userName}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});

//Save User
router.post('/user', function(req, res, next){
    var user = req.body;
    if(!user.firstName || (!user.lastName) || (!user.userName) || (!user.password)){
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
    
    if(user.firstName){
        updUser.firstName = user.firstName;
    }
    if(user.lastName){
        updUser.lastName = user.lastName;
    }
    if(user.userName){
        updUser.userName = user.userName;
    }
    if(task.password){
        updUser.password = user.password;
    }
    // if there is nothing to update
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