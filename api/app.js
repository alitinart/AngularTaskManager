const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');

// Load in the mongoose models
const { List, Task } = require('./db/models');

app.use(bodyParser.json());

// CORS HEADER 

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});  


// Get all lists

app.get('/lists', (req, res) => {
    List.find({}).then((lists) => {
        res.send(lists);
    });
})

// Create List

app.post('/lists', (req,res) => {
    let title = req.body.title

    let newList = new List({
        title
    })
    newList.save().then((listDoc) => {
        res.send(listDoc)
    })
})

// Update List

app.patch('/lists/:id',(req,res) =>{
    List.findOneAndUpdate({_id: req.params.id},{
        $set: req.body
    }).then(() => {
        res.sendStatus(200)
    })
})

// Delete List

app.delete('/lists/:id', (req, res) => {
    List.findOneAndRemove({_id: req.params.id}).then((removedListDoc) => {
        res.send(removedListDoc)
    })
})

// Get Tasks

app.get('/lists/:listId/tasks', (req, res) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks)
    })
})

// Create Task

app.post('/lists/:listId/tasks',(req,res) => {
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    })
})

// Update Task

app.patch('/lists/:listId/tasks/:taskId',(req,res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.send({message: 'Updated successfully'})
    })
})

// Delete Task

app.delete('/lists/:listId/tasks/:taskId',(req,res) => {
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc)
    })
})
app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})
