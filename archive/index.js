// index.js
// V1
const fs = require("fs");
const path = require("path")
const timestamp = require("time-stamp");
const util = require("util")

function Logger(settings = {}) {

	// setup
	var filename = settings.filename || "logger";
	var filenameFormat = `(${filename})`
	var saveLog = settings.save || false
	var saveLogPath = settings.path || "./logs.log"
	let ts = timestamp("YYMMDD HH:mm:ss.ms");

	// log methods
	this.log = (input) => output(input, "log");
	this.info = (input) => output(input, "info");
	this.warn = (input) => output(input, "warn");
	this.error = (input) => output(input, "error");
	this.debug = (input) => output(input, "debug");

	// functions
	function output(input, type) {
		if (typeof input ==! 'string') {
				input = util.inspect(input, { showHidden: true, depth: null });
			};
		if (type == "log") {
			console.log(filenameFormat, input);
		} else {
			console[type](filenameFormat, `<${type.toUpperCase()}>`, input);
		};

		if (saveLog) save(input, type);
	};

	function save(input, type) {
		let obj = `${ts}, "${filename}", ${type}, "${input}"\n`;
		fs.appendFile(saveLogPath, obj, function(error) {
			if (error) {
				console.error("(logger) error saving log", error);
			};
		});
	};
}

module.exports = Logger
