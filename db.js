const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TasksMission');
var db = mongoose.connection;
let { Members } = require('./members');
let { Tasks } = require('./tasks');
var router = express.Router();

db.on('error', console.log.bind(console, 'connection refused !!!!!'));
db.once('open', console.log.bind(console, 'connection success !!!!!'));

// Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;
var ID = mongoose.Types.ObjectId;


router.get('/tasks', (req, res) => {
    Tasks.find({}, (err, alltasks) => {
        console.log(alltasks);
        res.json(alltasks);
    })
})
// router.get('/tasks', (req, res) => {
//         Tasks.find()
//         .populate('Members')
//         .exec(function (err, post) {
//             if (err) console.log(err);
//             console.log(post)
//             res.json(post)
//         });

// })

router.get('/members', (req, res) => {
    Members.find({}, (err, allmembers) => {
        res.json(allmembers);
        console.log(allmembers);
    })
});

router.get('/members/:executor', function (req, res) {
    var query = Members.findById(req.params.executor).select(({ "name": 1, "_id": 0 }))// function(err, member) {
    //if(!member) {
    //     res.status(404).json({msg: "Customer not found with id " + req.params.executor});   
    // }
    // res.json(member);
    query.exec(function (err, membername) {
        if (err) res.status(404).json({ msg: "Member not found with id " + req.params.executor });
        res.json(membername);
    });
});





router.post('/tasks/new', (req, res) => {
    console.log('request: ' + req.body.name);
    let newtask = new Tasks({
        "_id": req.body._id,
        "name": req.body.name,
        "date": req.body.date,
        "executor": req.body.executor
    });
    // let newtask = new Tasks(req.body);
    console.log('NEWTASK: ' + newtask)
    newtask.save()
        .then(item => {
            res.status(200).send("item saved to db");
            console.log('item: ' + item);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.get('/tasks/:taskid', (req, res) => {
    Tasks.findByIdAndRemove(req.params.taskId)
})

router.get('/tasks/delete/:taskid', (req, res) => {
    Tasks.findById(req.params.taskid, (err, task) => {
        console.log("that is error: "+err)
        console.log("that is task: "+task)
        task.remove((err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('removed');
            }
        })
    })
})

module.exports = router;



