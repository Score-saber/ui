const colors = require('colors');

module.exports.logInfo = function(msg) { console.log(`[INFO] `.yellow + msg.white); }
module.exports.logError = function(msg) { console.log(`[ERROR] `.red + msg.white); }
module.exports.log = function(msg, field) { console.log(`[${field}] `.green + msg.white); }