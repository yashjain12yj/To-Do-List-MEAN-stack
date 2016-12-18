var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var methodOverride = require('method-override');
var Todo = mongoose.model('TODO');

router.get('/todo', function (req, res, next) {

    // use mongoose to get all todos in the database
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(todos); // return all todos in JSON format
    });
});

router.post('/todo', function (req, res, next) {

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text: req.body.text,
        done: false
    }, function (err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function (err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

router.delete('/todo/:todo_id', function (req, res, next) {

    Todo.remove({
        _id: req.params.todo_id
    }, function (err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function (err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'To Do List'
    });
});

module.exports = router;
