/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed LICENSE file.
*/
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/mongoshu/apis/lib/constants`);
const { MongoClient } = require(`${API_CONSTANTS.MODULES_DIR}/mongodb`);
const assert = require("assert");
const dbName = 'agenda';
const url = "mongodb://localhost:27017/agenda";

const Create_Collection = async () => {
  try {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      dbo = db.db(dbName);
      dbo.createCollection("tasks", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
      });
    });
  } catch (err) {
    console.log(err);
  }
}

const Get_Tasks = async (jsonReq) => {
  return new Promise((resolve, reject) => {
    try {
      const connection = MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        dbo = db.db(dbName);
        let queryparams = {};
        if (jsonReq.task) queryparams = { task: jsonReq.task };
        console.log(jsonReq);
        dbo.collection("agenda").find(queryparams).toArray((err, result) =>{
          if (err) throw err;
          resolve(result);
          db.close();
        });
      });
    }
    catch (err) { console.log(err); }
  });
};

const Delete_Task = async (jsonReq) => {
  return new Promise((resolve, reject) => {
    
    try {
      const myobj = JSON.parse(jsonReq.obj);
       if (myobj.task == undefined) {
        resolve({result: false, message: "Incorrect deletion object, please include a task: field"});
       }
      MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
        assert.equal(null, err);
        dbo = db.db(dbName);
        const query = { task: myobj.task};
        dbo.collection("agenda").deleteOne(query, (err, result) =>{
          if (err) throw err;
          if (result.result.n > 0) {
            resolve({ result: true, message: "Deletion of task was sucessful" });
          }
          else {
            resolve({ result: false, message: "Could not delete task" });
          }
          db.close();
        });
      });
    }
    catch (err) { resolve(err); }
  });
}

const Insert_Task = async (jsonReq) => {
  return new Promise((resolve, reject) => {
    console.log("inside promise");
    try {
      const myobj = JSON.parse(jsonReq.obj);
       if (myobj.task == undefined || myobj.desc == undefined) {resolve({result: false, message: "Incorrect insertion object, please include a task: and desc: field"});}
      MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
        assert.equal(null, err);
        dbo = db.db(dbName);

        dbo.collection("agenda").insertOne(myobj, (err, res) => {
          if (err) throw err;
          resolve({ result: true, message: "Creation of task was sucessful" });
          db.close();
        });
      });
    }
    catch (err) { resolve(err); }
  });
}

const Update_Task = async (jsonReq) => {
  return new Promise((resolve, reject) => {
    try {
        const myobj = JSON.parse(jsonReq.obj);
       if (myobj.old_task == undefined || (myobj.new_task == undefined && myobj.new_desc == undefined)) {resolve({result: false, message: "Incorrect update object, please include a old_task: and at least a new_task: or new_desc: field"});}
      MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
        assert.equal(null, err);
        dbo = db.db(dbName);

        const myquery = { "task": myobj.old_task };
        let queryObj = {};

        myobj.new_task ? queryObj.task = myobj.new_task : queryObj;
        myobj.new_desc ? queryObj.desc = myobj.new_desc : queryObj;

        newquery = { $set: queryObj };
        dbo.collection("agenda").updateOne(myquery, newquery, (err, res) => {
          if (err) { resolve({ result: false, message: "Could not update task" }) }
          resolve({ result: true, message: "Update of task was sucessful" });
          db.close();
        });
      });
    }
    catch (err) { resolve({ result: false, message: "Could not update task" }) }
  });
}

//testing only//
async function init() {
  console.log(await Create_Collection());
}
// RUN THIS TO CREATE THE COLLECTION DB : AGENDA
//init();

module.exports = { Get_Tasks, Insert_Task, Update_Task, Delete_Task, Create_Collection };

