// index.js

const timestamp = require("time-stamp")
const fs = require("fs")


function Logger(filename, settings) {
	this.settings = settings || {}
	let save = this.settings.save || false
	let path = this.settings.path || "./logs.csv"

	var ts = timestamp("YYMMDD HH:mm:ss.ms")
	logFilename = `(${filename})`
	this.name = "(Logger)"

	this.log = (input) => {
		let output = `${logFilename} ${input}`
		console.log(output)
		if (save) saveLog(filename, "log", input)
	};
	this.error = (input) => {
		let output = `${logFilename} ERROR ${input}`
		console.error(output)
		if (save) saveLog(filename, "error", input)
	};
	this.warn = (input) => {
		let output = `${logFilename} WARN ${input}`
		console.error(output)
		if (save) saveLog(filename, "warn", input)
	};

	function saveLog(filename, logType, input) {
		let obj = `${ts}, ${filename}, ${logType}, "${input}"\n`
		fs.appendFile(path, obj, function(error) {
			if (error) {
				console.error(this.name, "error saving log", error);
			};
		});

	}

}

module.exports = Logger


// console.log(ts)