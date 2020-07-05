// index.js

const timestamp = require("time-stamp")
const fs = require("fs")

class Logger {
	constructor(settings) {
		settings = settings || {};
		let label = settings.label || "logger"
		let save = settings.save || false;
		let path = settings.path || "./logs.log";
		let ts = timestamp("YYMMDD HH:mm:ss.ms");
		let logLabel = `(${label})`

		this.log = (input) => {
			console.log(logLabel, input)
			if (save) saveLog(label, "log", input)
		};
		this.error = (input) => {
			console.error(logLabel, "ERROR", input)
			if (save) saveLog(label, "error", input)
		};
		this.warn = (input) => {
			console.error(logLabel, "WARN", input)
			if (save) saveLog(label, "warn", input)
		};

		function saveLog(label, logType, input) {
			let obj = `${ts}, "${label}", ${logType}, "${input}"\n`;
			fs.appendFile(path, obj, function(error) {
				if (error) {
					console.error("(logger) error saving log", error);
				};
			});
		};
	};
};

module.exports = Logger