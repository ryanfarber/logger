// index.js

const timestamp = require("time-stamp")
const fs = require("fs")

class Logger {
	constructor(settings) {
		settings = settings || {};
		let label = settings.label || "logger"
		var custom
		if (!settings.customLog) {
			custom = "CUSTOM"
		} else {
			custom = settings.customLog.toUpperCase();
		}
		let save = settings.save || false;
		let path = settings.path || "./logs.log";
		let ts = timestamp("YYMMDD HH:mm:ss.ms");
		let logLabel = `(${label})`

		this.log = (input) => {
			console.log(logLabel, input)
			if (save) saveLog(label, "log", input)
		};
		this.info = (input) => {
			console.info(logLabel,"INFO", input)
			if (save) saveLog(label, "info", input)
		};
		this.error = (input) => {
			console.error(logLabel, "ERROR", input)
			if (save) saveLog(label, "error", input)
		};
		this.warn = (input) => {
			console.warn(logLabel, "WARN", input)
			if (save) saveLog(label, "warn", input)
		};
		this.custom = (input) => {
			console.log(logLabel, custom, input)
			if (save) saveLog(label, custom, input)
		}

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