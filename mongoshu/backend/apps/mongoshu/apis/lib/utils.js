/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed LICENSE file.
*/
/**

4

* Generate random RFC-compliant UUIDs in JavaScript
* source: https://github.com/kelektiv/node-uuid
*/


module.exports.uniqid = () => require(__dirname +"/../../3p/node_modules/uuid/v4")();