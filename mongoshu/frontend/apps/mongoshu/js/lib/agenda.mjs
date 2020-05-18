/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed LICENSE file.
*/
import { apimanager as apiman } from "/framework/js/apimanager.mjs";


const LoadTasks = async (task) => {
    let queryparams = {};
    if(task) queryparams = {task : task};
	let resp = await apiman.rest(APP_CONSTANTS.API_GET, "GET",queryparams,
		false, true);
	var count = 0;
	var body = `</br> <form onsubmit="Global_Insert()" id="my_form"></form> <table style='width:60%' id='agendatable'><tr><th colspan='2'><h1>AGENDA</h1></th><th><input type="text" id='searchbar' placeholder="Search..." form="my_form"><button onclick ="Global_Search()">🔎</button></th><th><button onclick = "Home()">🏠</button></th></tr><tr><th><h2>TASK</h2></th><th><h2>DESCRIPTION</h2></th></tr>`;
	for (let task of resp.message)
	{	
	
		body += `<tr><th id="task${count}">${task.task}</th> <th id="desc${count}">${task.desc}</th><th><button onclick="Global_Delete('${task.task}')"> X </button></th><th><button id ="update${count}" onclick="Edit_Update_Field('${count}')"> ✎ </button></th><th id="old_task${count}" style="display:none">${task.task}</th></tr>`;
		count += 1;

	}


	body += `<tr>
	<th><input type="text" id="tname" from="my_form" required></th>
  <th><input type="text" id="desc" form="my_form"></th>
  <th><input type="submit" value="+" form="my_form"></th>
</tr>`;

	body += "</table>";

	document.getElementById('info').innerHTML = body;
}


const Insert = async (task,desc) => {
	alert("begin insert");
	const query =`{"task":"${task}", "desc":"${desc}"}`;

	let resp = await apiman.rest(APP_CONSTANTS.API_MODIFY, "POST",{command:'insert',obj:query} ,false, true);
	
	alert(resp.message);

	LoadTasks();

}

const Update = async (old_task,task,desc) => {
	alert("begin update");
	const query =`{"old_task":"${old_task}" ,"new_task":"${task}", "new_desc":"${desc}"}`;

	let resp = await apiman.rest(APP_CONSTANTS.API_MODIFY, "POST",{command:'update',obj:query} ,false, true);
	
	alert(resp.message);

	LoadTasks();

}

const Delete = async (task) => {
	alert("begin delete");
	const query =`{"task":"${task}"}`;

	let resp = await apiman.rest(APP_CONSTANTS.API_MODIFY, "POST",{command:'delete',obj:query} ,false, true);
	
	alert(resp.message);

	LoadTasks();

}


/**

 I wanted to be able to have all the functionality rendered on a single page and dynamically updated, however when I imported
this file as a module in the agenda html, it would produce errors with
 trying to dynamically create the pages, when the loadpages function would
create a string of html elements like, <button = onclick Delete(task) - it wouldnt work as the html page didnt have refference to Delete 
function, thinking it was missing a script on its own page, not the agenda.mjs script (I probably missed something obvious here sorry - in hindsight something like global.exports.Delete() or something if I labeled the function as global)

I then tried onclick = agenda.Delete() for hopes that it would be okay on the
agenda html page as the original loadtasks() is called from importing this file as 'agenda' , but it still provided errors, 
the only solution I could find was to make some global functions below
this would enable the dynamically typed html elements to have some refference to my functions
this also meant that I didnt need seperate pages, and could have better UX
ie a refference for the delete- so the user themselves did not have to go to a delete page and then specifically type in the task name 

it would have been simpler to make different mjs files with each CRUD functioality and different HTML pages / or import them all into agenda html, but I didnt want the user
experience to be strange, going to a different page and typing in a delete command, going to an update page and having to type
old task new task new desc for the actual backend functionality requirements, creating a refference to it all in a single page enabled just simple buttons scripted
for deletes like [X], no need for user to type in the actual fields required for the api

**/








//simple back button for after a search result - get back to all tasks
window.Home = async()=>{
	LoadTasks();
}
window.Global_Search = async()=>{
	const searchtask = document.getElementById('searchbar').value;
	LoadTasks(searchtask);
}


// this function changes the table information to input elements so you can edit that row
window.Edit_Update_Field = async(row_id)=>{
	const task = document.getElementById('task'+row_id.toString());
	const desc = document.getElementById('desc'+row_id.toString());
	const update_btn = document.getElementById('update'+row_id.toString());

	task.innerHTML = `<input id = newtask${row_id} type="text" value="${task.innerHTML}">`;
	desc.innerHTML = `<input id = newdesc${row_id} type="text" value="${desc.innerHTML}">`;
	update_btn.innerHTML = "✔";
	update_btn.onclick = ()=>{Global_Update(row_id)};


}

// this function will pass the changed information into the backend Update function
window.Global_Update = async(row_id)=>{
	const old_task = document.getElementById('old_task'+row_id.toString()).innerHTML;
	const new_task = document.getElementById('newtask'+row_id.toString()).value;
	const new_desc = document.getElementById('newdesc'+row_id.toString()).value;

	Update(old_task,new_task,new_desc);

}

// passes the information in the input fields into the Insert function for calls to the backend
window.Global_Insert = async()=>{
	const task = document.getElementById('tname').value;
	const desc = document.getElementById('desc').value;
	if(task != ""){Insert(task,desc)}

}

window.Global_Delete = async(task) =>{
	Delete(task);
}






export const agenda = {LoadTasks, Global_Delete};
