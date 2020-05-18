/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed license.txt file.
*/

const FRONTEND = "http://localhost:8080";
const BACKEND = "http://localhost:9090";
const APP_NAME = "mongoshu";
const APP_PATH = `${FRONTEND}/apps/${APP_NAME}`;
export const APP_CONSTANTS = {
FRONTEND, BACKEND, APP_PATH, APP_NAME,
AGENDA_HTML: APP_PATH + "/agenda.html",
SESSION_NOTE_ID: "com_monkshu_ts",
API_GET: `${BACKEND}/apis/agenda`,
API_MODIFY: `${BACKEND}/apis/modify`,
USERID: "id",
USER_ROLE: "user",
GUEST_ROLE: "guest",
PERMISSIONS_MAP: {
user: [APP_PATH + "/agenda.html",
$$.MONKSHU_CONSTANTS.ERROR_THTML],
guest: [APP_PATH + "/agenda.html",
$$.MONKSHU_CONSTANTS.ERROR_THTML]
},
API_KEYS: { "*": "uiTmv5YBOZMqdTb0gekD40PnoxtB9Q0k" },
KEY_HEADER: "X-API-Key"
}