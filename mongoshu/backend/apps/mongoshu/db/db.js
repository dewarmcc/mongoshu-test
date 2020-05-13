/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed LICENSE file.
*/
const CONSTANTS = require('/Users/ayazi/mongoshu-project/monkshu/backend/server/lib/constants');
// remove later
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/mongoshu/apis/lib/constants`);
const {MongoClient} = require(`${API_CONSTANTS.MODULES_DIR}/mongodb`);
const assert = require("assert");
const util = require('util');

 // Database Name
const dbName = 'agenda';

const url = "mongodb://localhost:27017/agenda";


const Create_Collection =  async () => {
	try{
	
	MongoClient.connect(url, {useUnifiedTopology: true  },(err, db)=> {
    	assert.equal(null, err);
 		console.log("Connected correctly to server");
		dbo = db.db(dbName);
	
		
  		dbo.createCollection("tasks", function(err, res) {
    		if (err) throw err;
    			console.log("Collection created!");
    		db.close();
  			});
  		});
	}

	catch (err){

	console.log(err);
	}
}

const Get_Tasks =  async (jsonReq) => {    return new Promise((resolve, reject) => {
	try{
	const connection = MongoClient.connect(url, {useUnifiedTopology: true  },(err, db)=> {
    	assert.equal(null, err);
 		console.log("Connected correctly to server");
		dbo = db.db(dbName);
	let queryparams ={};
	if(jsonReq.task) queryparams = {task : jsonReq.task};
	console.log(jsonReq);
  	dbo.collection("agenda").find(queryparams).toArray(function(err, result) {
    if (err) throw err;
    resolve(result);
    db.close();
  		});
  	});
	}
	catch (err){console.log(err);}
});
};

const Get_Task =  async (task_) => {  return new Promise((resolve, reject) => {
	try{
	MongoClient.connect(url, {useUnifiedTopology: true  },(err, db)=> {
    	assert.equal(null, err);
 		console.log("Connected correctly to server");
		dbo = db.db(dbName);
	const query = { task: task_};
  	dbo.collection("agenda").find(query).toArray(function(err, result) {
    if (err) reject (err);
    resolve(result);
    db.close();
  		});
  	});
	}
	catch (err){reject(err);}
});
}

const Delete_Task =  async (task_) => { return new Promise((resolve, reject) => {
	try{
	MongoClient.connect(url, {useUnifiedTopology: true  },(err, db)=> {
    	assert.equal(null, err);
 		console.log("Connected correctly to server");
		dbo = db.db(dbName);
	const query = { task: task_};
  	dbo.collection("agenda").deleteOne(query, function(err, result) {
    if (err) throw err;
    if(result.result.n > 0){

    	resolve({result: true, message: "Deletion of task was sucessful"});

    }
    else{
    	resolve({result: false, message: "Could not delete task"});
    }
    db.close();
  		});
  	});
	}
catch (err){resolve(err);}
});
}



const Insert_Task =  async (task_name,task_desc) => { return new Promise((resolve, reject) => {
	try{
	MongoClient.connect(url, {useUnifiedTopology: true  },(err, db)=> {
    	assert.equal(null, err);
 		console.log("Connected correctly to server");
		dbo = db.db(dbName);
	
		myobj  = {task: task_name, desc: task_desc};

  	dbo.collection("agenda").insertOne(myobj, function(err, res) {
    	if (err) throw err;
    	resolve({result: true, message: "Creation of task was sucessful"});
    	db.close();
  		});
  	});
	}
	catch (err){resolve(err);}
});
}

const Update_Task = async (old_task,new_task, new_desc) =>{ return new Promise((resolve, reject) => {
	if(old_task == null){
		resolve({result: false, message: "Could not update task"});
	}

	try{
	MongoClient.connect(url, {useUnifiedTopology: true  },(err, db)=> { 
    	assert.equal(null, err);
 		console.log("Connected correctly to server");
		dbo = db.db(dbName);
  		
  		const myquery = { "task" : old_task };
  		let myObj = {};

  		new_task? myObj.task = new_task : myObj;
  		new_desc? myObj.desc = new_desc : myObj;

  		newvalues = { $set: myObj};
  		dbo.collection("agenda").updateOne(myquery, newvalues, function(err, res) {
    		if (err){resolve({result: false, message: "Could not update task"})}
    		resolve({result: true, message: "Creation of task was sucessful"});
     	db.close();
  		});
  	});
	}
	catch (err){resolve({result: false, message: "Could not update task"})}
});
}



//testing//

async function init(){
	var jsonReq = {task : 'watch'}
	console.log(await Get_Tasks(jsonReq));
}
//init();
module.exports = {Get_Tasks};
