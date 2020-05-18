/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed LICENSE file.
*/
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/mongoshu/apis/lib/constants`);
const db = require('/Users/ayazi/mongoshu-project/mongoshu/backend/apps/mongoshu/db/db.js');

exports.doService = async jsonReq => {
if (!validateRequest(jsonReq)) {LOG.error("Validation failure."); return CONSTANTS.FALSE_RESULT;}
    try {

        if(typeof(JSON.parse(jsonReq.obj)) != 'object') return {result: false, message : "obj field not correct type"};

    	const typereq = jsonReq.command.toUpperCase();
    	if(typereq == 'UPDATE'){
    		const message = await db.Update_Task(jsonReq); 
    		return message;
    	}
    	else if(typereq == 'DELETE'){

            const message = await db.Delete_Task(jsonReq); 
            return message;

        }
    	else if (typereq == 'INSERT'){

    		const message = await db.Insert_Task(jsonReq); 
    		return message;

    	}
    	else{
    		return {result : false, message: "Command not recognised, AVALIABLE COMMANDS: UPDATE, DELETE, INSERT"};
    	}

     	if (!message) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { message };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}

const validateRequest = jsonReq => (jsonReq, jsonReq.command, jsonReq.obj);