"use strict";
const express = require('express');
const app = express();
app.use(require('body-parser').json());

var todo = [];
var uniqueId = 0;


app.get('/todo',(req, res, next) => {
	res.status(200).json(todo);
	console.log("all tasks sent");
});

app.get('/todo/:id',(req, res, next) => {
	for (var i = 0; i < todo.length; i++) {
		if (todo[i].id == req.params.id) {
			res.status(200).json(todo[i]);
			console.log("task " + todo[i].id + " sent");
			return;
		}
	}
	console.log("error " + req.params.id + " not found");
	res.status(404).json({"message":"Not Found"});
});

app.post('/todo',(req, res, next) => {
	uniqueIdMaker();
	var newTask = {};
	newTask.id = uniqueId;
	newTask.task = req.query.task;
	todo.push(newTask);
	res.status(201).json(todo);	
	console.log("task " + req.query.task + " added");
});

app.patch('/todo/:id',(req, res, next) => {
	if (req.params.id !== undefined){
		for (var i = 0; i < todo.length; i++) {
			if (todo[i].id == req.params.id) {
				todo[i].task = req.query.task;
				res.status(200).json(todo[i]);
				console.log("task " + todo[i].id + " got updated");
				return;
			}
		}
		console.log("error " + req.params.id + " not found");
		res.status(404).json({"message":"Not Found"});
	}
});

app.delete('/todo/:id',(req, res, next) => {
	
	if(req.params.id !== "all"){
		for (var i = 0; i < todo.length; i++) {
			if (todo[i].id == req.params.id) {
				todo.splice(i,1);
				res.status(200).json(todo);
				console.log("task " + req.params.id + " got deleted");
				return;
			}
		}
		console.log("error " + req.params.id + " not found");
		res.status(404).json({"message":"Not Found"});
	} else {
		todo = [];
		console.log("all tasks got deleted");
		res.status(200).json({"message":"all tasks got deleted"});
	}

});


function uniqueIdMaker(){
	return uniqueId++;
}

app.listen(3000, ()=>{
	console.log('listening to port 3000')
});