//const CONSTANTS = require('/Users/ayazi/mongoshu-project/monkshu/backend/server/lib/constants');
// remove later
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/mongoshu/apis/lib/constants`);

const db= require( '/Users/ayazi/mongoshu-project/mongoshu/backend/apps/mongoshu/db/db.js' );


exports.doService = async jsonReq => {

if (!validateRequest(jsonReq)) return {result: false, message: "invalid request"};


try {
const message = await db.Get_Tasks({jsonReq});
if (!message) return API_CONSTANTS.API_RESPONSE_FALSE;
return { message };
} catch (error) {
console.error(error);
return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
}


}




let validateRequest = jsonReq => (jsonReq && jsonReq.task);

// async function init(){
// 	console.log(await db.Get_Tasks());
// }

// init();