// index.js
// V2

const fs = require("fs");
const path = require("path");
const timestamp = require("time-stamp");
const util = require("util");
const chalk = require("chalk")

var ts = timestamp("YYMMDD HH:mm:ss.ms");

class Logger {

	constructor(prefix, config = {}) {
		// console.log(prefix)
		prefix = prefix || "logger"
		if (typeof prefix !== "string") prefix = "logger"
		// console.log(path.parse(prefix))
		prefix = path.parse(prefix).name
		this.prefix = prefix.toLowerCase().trim()
		this.prefixDisplay = `${chalk.dim("@ ") + chalk.cyan.underline(prefix.trim()) + chalk.dim(":")}`;
		this.logPath = config.logPath
		this.types = {
			log: chalk.bold.white("  LOG"),
			info: chalk.bold.cyan(" INFO"),
			warn: chalk.bold.red(" WARN"),
			error: chalk.bold.red("ERROR"),
			debug: chalk.bold.dim("DEBUG")
		}
		this._debug = config.debug
		this.prefix
		this.performancePrefix = `${chalk.magenta.bold("SPEED")} ${chalk.dim("@ ") + chalk.cyan.underline(prefix.trim())}`
	}

	log() {
		this.type = "log";
		this.typeDisplay = this.types[this.type]
		
		this.args = Array.prototype.slice.call(arguments);
		this.argsDisplay = Array.prototype.slice.call(arguments);
		this.argsDisplay.unshift(this.typeDisplay + " " + this.prefixDisplay);

		console[this.type].apply(console, this.argsDisplay);

		if (this.logPath) save(this.logPath, this.prefix, this.type, this.args);
	}

	info() {
		this.type = "info";
		this.typeDisplay = this.types[this.type]
		
		this.args = Array.prototype.slice.call(arguments);
		this.argsDisplay = Array.prototype.slice.call(arguments);
		this.argsDisplay.unshift(this.typeDisplay + " " + this.prefixDisplay);

		console[this.type].apply(console, this.argsDisplay);

		if (this.logPath) save(this.logPath, this.prefix, this.type, this.args);
	}

	warn() {
		// if (!this._debug) return
		this.type = "warn";
		this.typeDisplay = this.types[this.type]
		let args = (Object.values(arguments))
		
		if (args.length == 1 && typeof args[0] === "string") {
			console[this.type](this.typeDisplay, this.prefixDisplay,chalk.red.bold(args[0]));
		} else {
			this.args = Array.prototype.slice.call(arguments);
			this.argsDisplay = Array.prototype.slice.call(arguments);
			this.argsDisplay.unshift(this.typeDisplay + " " + this.prefixDisplay);

			console[this.type].apply(console, this.argsDisplay);
		}

		if (this.logPath) save(this.logPath, this.prefix, this.type, this.args);
	}

	error() {
		this.type = "error";
		this.typeDisplay = this.types[this.type]

		this.args = Array.prototype.slice.call(arguments);
		this.argsDisplay = Array.prototype.slice.call(arguments);
		this.argsDisplay.unshift(this.typeDisplay + " " + this.prefixDisplay);

		console[this.type].apply(console, this.argsDisplay);

		if (this.logPath) save(this.logPath, this.prefix, this.type, this.args);
	}

	// error(...args) {
		
	// 	console.error(...args.map(t => chalk.red(t)));
	// }

	debug() {
		if (!this._debug) return
		this.type = "debug";
		this.typeDisplay = this.types[this.type]
		let args = (Object.values(arguments))
		
		if (args.length == 1 && typeof args[0] === "string") {
			console[this.type](this.typeDisplay,this.prefixDisplay,chalk.dim(args[0]));
		} else {
			this.args = Array.prototype.slice.call(arguments);
			this.argsDisplay = Array.prototype.slice.call(arguments);
			this.argsDisplay.unshift(this.typeDisplay + " " + this.prefixDisplay);

			console[this.type].apply(console, this.argsDisplay);
		}

		if (this.logPath) save(this.logPath, this.prefix, this.type, this.args);
	}

	time(label) {
		if (!this._debug) return
		if (typeof label === "string" || label == undefined) {
			let newLabel
			if (!label) newLabel = `${this.performancePrefix}`
			else newLabel = `${this.performancePrefix}/${label}`
			console.time(newLabel)
		}
		else return console.error("performance timer lable must be a string!")

	}

	timeEnd(label) {
		if (!this._debug) return
		if (typeof label === "string" || label == undefined) {
			let newLabel
			if (!label) newLabel = `${this.performancePrefix}`
			else newLabel = `${this.performancePrefix}/${label}`
			console.timeEnd(newLabel)
		}
		else return console.error("performance timer lable must be a string!")
	}

	start(label) {this.time(label)}
	stop(label) {this.timeEnd(label)}
	end(label) {this.timeEnd(label)}
	
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

