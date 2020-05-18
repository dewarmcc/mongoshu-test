/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed LICENSE file.
*/
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/mongoshu/apis/lib/constants`);
const db = require('/Users/ayazi/mongoshu-project/mongoshu/backend/apps/mongoshu/db/db.js');

exports.doService = async jsonReq => {
if (!validateRequest(jsonReq)) {LOG.error("Validation failure."); return CONSTANTS.FALSE_RESULT;}
    try {
    	console.log(jsonReq.task);
        const message = await db.Get_Tasks(jsonReq);
        if (!message) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { message };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}

const validateRequest = jsonReq => (jsonReq);