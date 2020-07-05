// index.js

const timestamp = require("time-stamp")
const fs = require("fs")


class Logger {
	constructor(filename, settings) {
		this.settings = settings || {}
		let save = this.settings.save || false
		let path = this.settings.path || "./logs.log"

		var ts = timestamp("YYMMDD HH:mm:ss.ms")
		var logFilename = `(${filename})`
		this.name = "(Logger)"

		this.log = (input) => {
			console.log(logFilename, input)
			if (save) saveLog(filename, "log", input)
		};
		this.error = (input) => {
			console.error(logFilename, "ERROR", input)
			if (save) saveLog(filename, "error", input)
		};
		this.warn = (input) => {
			console.error(logFilename, "WARN", input)
			if (save) saveLog(filename, "warn", input)
		};

		function saveLog(filename, logType, input) {
			let obj = `${ts}, ${filename}, ${logType}, "${input}"\n`
			fs.appendFile(path, obj, function(error) {
				if (error) {
					console.error(this.name, "error saving log", error);
				};
			});
		};

	}
};

module.exports = Logger