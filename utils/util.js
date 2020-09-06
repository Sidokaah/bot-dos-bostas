const fs = require("fs");
const path = require("path");
module.exports.Utils = class Utils {
	formatSeconds = (seconds) => {
		return new Date(seconds * 1000).toISOString().substr(11, 8)  
    }
    replaceStrChar = (str, index, replacement) => {
		return str.substr(0, index) + replacement + str.substr(index + replacement.length);
	}
}