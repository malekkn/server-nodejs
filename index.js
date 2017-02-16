"use strict";
const express = require('express');
const app = express();
app.use(require('body-parser').json());

var todo = [{
    "id": 0,
    "task": "cooking"
  },
  {
    "id": 2,
    "task": "cooking"
  },
  {
    "id": 3,
    "task": "cooking"
  },
  {
    "id": 4,
    "task": "cooking"
  },
  {
    "id": 5,
    "task": "cooking"
  },
  {
    "id": 6,
    "task": "cooking"
  },
  {
    "id": 7,
    "task": "cooking"
  }];
var uniqueId = 0;



app.get('/todo',(req, res, next) => {
	res.status(200).json(todo);
});

app.post('/todo',(req, res, next) => {
	uniqueIdMaker();
	var newTask = {};
	newTask.id = uniqueId;
	newTask.task = req.query.task;
	todo.push(newTask);
	res.status(201).json(todo);	
	console.log("task "+ req.query.task + "added");

});

app.patch('/todo/:id',(req, res, next) => {
	console.log(req.params.id);
	if (req.params.id !== undefined){
		for (var i =0; i < todo.length; i++) {
			if (todo[i].id == req.params.id) {
			todo[i].task = req.query.task;
			res.status(200).json(todo[i]);
			console.log("task number "+todo[i].id+" got updated");
			}
		}
		console.log("error not found");
		res.status(404).json({"message":"Not Found"});
	}
});

app.delete('/todo/:id',(req, res, next) => {
	for (var i =0; i < todo.length; i++) {
		console.log(todo[i].id);
		if (todo[i].id == req.params.id) {
			todo.splice(i,1);
		}
	}
	res.status(200).json(todo);
	console.log("task number "+req.params.id+" got deleted");
});

//------------------------------------------------
function uniqueIdMaker(){
	return uniqueId++;
}

app.listen(3000, ()=>{
	console.log('listening to port 3000')
});