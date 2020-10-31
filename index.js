// index.js
// V2

const fs = require("fs");
const path = require("path");
const timestamp = require("time-stamp");
const util = require("util");

var ts = timestamp("YYMMDD HH:mm:ss.ms");

class Logger {

	constructor(prefix, logPath) {
		this.prefix = prefix.toLowerCase().trim();
		this.prefixDisplay = `[${prefix.trim()}]`;
		this.logPath = logPath || "./logs.log";
	}

	log() {
		this.type = "log";
		this.typeDisplay = "";
		
		this.args = Array.prototype.slice.call(arguments);
		this.argsDisplay = Array.prototype.slice.call(arguments);
		this.argsDisplay.unshift(this.prefixDisplay);

		console[this.type].apply(console, this.argsDisplay);

		if (this.logPath) save(this.logPath, this.prefix, this.type, this.args);
	}

	info() {
		this.type = "info";
		this.typeDisplay = `[${this.type.toUpperCase()}] `;
		
		this.args = Array.prototype.slice.call(arguments);
		this.argsDisplay = Array.prototype.slice.call(arguments);
		this.argsDisplay.unshift(this.typeDisplay + " " + this.prefixDisplay);

		console[this.type].apply(console, this.argsDisplay);

		if (this.logPath) save(this.logPath, this.prefix, this.type, this.args);
	}

	warn() {
		this.type = "warn";
		this.typeDisplay = `[${this.type.toUpperCase()}] `;
		
		this.args = Array.prototype.slice.call(arguments);
		this.argsDisplay = Array.prototype.slice.call(arguments);
		this.argsDisplay.unshift(this.typeDisplay + " " + this.prefixDisplay);

		console[this.type].apply(console, this.argsDisplay);

		if (this.logPath) save(this.logPath, this.prefix, this.type, this.args);
	}

	error() {
		this.type = "error";
		this.typeDisplay = `[${this.type.toUpperCase()}]`;
		
		this.args = Array.prototype.slice.call(arguments);
		this.argsDisplay = Array.prototype.slice.call(arguments);
		this.argsDisplay.unshift(this.typeDisplay + " " + this.prefixDisplay);

		console[this.type].apply(console, this.argsDisplay);

		if (this.logPath) save(this.logPath, this.prefix, this.type, this.args);
	}

	debug() {
		this.type = "debug";
		this.typeDisplay = `[${this.type.toUpperCase()}]`;
		
		this.args = Array.prototype.slice.call(arguments);
		this.argsDisplay = Array.prototype.slice.call(arguments);
		this.argsDisplay.unshift(this.typeDisplay + " " + this.prefixDisplay);

		console[this.type].apply(console, this.argsDisplay);

		if (this.logPath) save(this.logPath, this.prefix, this.type, this.args);
	}
	
};

function save(logPath, prefix, type, input) {
	// input = JSON.stringify(input, null)
	let obj = `${ts}, "${prefix}", ${type}, "${input}"\n`;
	fs.appendFile(logPath, obj, function(error) {
		if (error) {
			console.error("(logger) error saving log", error);
		};
	});
};


module.exports = Logger

