// src.js

const fs = require("fs")
const path = require("path")
const timestamp = require("time-stamp")
const util = require("util")
const chalk = require("chalk")

var ts = timestamp("YYMMDD HH:mm:ss.ms")

class Logger {

	constructor(prefix, config = {}) {
		// console.log(prefix)
		this.simple = config.simple
		this._debug = config.debug
		let showName = config.showName
		prefix = prefix || "logger"
		if (typeof prefix !== "string") prefix = "logger"
		// console.log(path.parse(prefix))
		prefix = path.parse(prefix).name
		this.prefix = prefix.toLowerCase().trim()
		this.prefixDisplay = `${chalk.cyan.underline(prefix.trim())}`
		
		if (this.simple || showName) this.prefixDisplay = chalk.dim("|")

		this.logPath = config.logPath
		this.types = {
			log: chalk.bold.white("LOG  "),
			info: chalk.bold.cyan("INFO "),
			warn: chalk.bold.yellow("WARN "),
			error: chalk.bold.red("ERROR"),
			debug: chalk.bold.dim.white("DEBUG"),
			deprecated: chalk.bold.red("DEPRECATED")
		}
		// this.prefix
		this.performancePrefix = `${chalk.magenta.bold("SPEED")} ${chalk.dim("@ ") + chalk.cyan.underline(prefix.trim())}`

		this.format = function(type, args) {
			let pre = `${this.types[type]} ${this.prefixDisplay}`
			if (!args) args = {}
			if (this.simple) return args
			let newArgs = Array.prototype.slice.call(args)
			newArgs.unshift(pre)
			return newArgs
		}

		this.debug.spacer = () => this.spacer
	}

	log() {
		this.type = "log"
		this.args = Array.prototype.slice.call(arguments)
		this.argsDisplay = this.format(this.type, arguments)

		console[this.type].apply(console, this.argsDisplay)

		if (this.logPath) save(this.logPath, this.prefix, this.type, this.args);
	}

	info() {
		this.type = "info"
		this.args = Array.prototype.slice.call(arguments)
		let args = (Object.values(arguments))
		
		if (args.length == 1 && typeof args[0] === "string") {
			this.typeDisplay = this.types[this.type]
			this.argsDisplay = this.format(this.type, args[0])
			console[this.type](this.typeDisplay, this.prefixDisplay, args[0])
		} else {
			this.argsDisplay = this.format(this.type, arguments)
			console[this.type].apply(console, this.argsDisplay)
		}

		if (this.logPath) save(this.logPath, this.prefix, this.type, this.args);
	}

	warn() {
		this.type = "warn";
		this.args = Array.prototype.slice.call(arguments)
		let args = (Object.values(arguments))
		
		if (args.length == 1 && typeof args[0] === "string") {
			this.typeDisplay = this.types[this.type]
			this.argsDisplay = this.format(this.type, args[0])
			console[this.type](this.typeDisplay, this.prefixDisplay,chalk.yellow.bold(args[0]))
		} else {
			this.argsDisplay = this.format(this.type, arguments)
			console[this.type].apply(console, this.argsDisplay)
		}

		if (this.logPath) save(this.logPath, this.prefix, this.type, this.args)
	}

	error() {
		this.type = "error";
		this.args = Array.prototype.slice.call(arguments);
		let args = (Object.values(arguments))
		
		if (args.length == 1 && typeof args[0] === "string") {
			this.typeDisplay = this.types[this.type]
			this.argsDisplay = this.format(this.type, args[0])
			console[this.type](this.typeDisplay, this.prefixDisplay, chalk.red.bold(args[0]));
		} else {
			this.argsDisplay = this.format(this.type, arguments)
			console[this.type].apply(console, this.argsDisplay)
		}

		if (this.logPath) save(this.logPath, this.prefix, this.type, this.args);
	}


	debug() {
		if (!this._debug) return

		this.type = "debug";
		this.args = Array.prototype.slice.call(arguments)
		let args = (Object.values(arguments))
		
		if (args.length == 1 && typeof args[0] === "string") {
			this.typeDisplay = this.types[this.type]
			this.argsDisplay = this.format(this.type, args[0])
			console[this.type](this.typeDisplay, this.prefixDisplay, chalk.dim(args[0]));
		} else {
			this.argsDisplay = this.format(this.type, arguments)
			console[this.type].apply(console, this.argsDisplay)
		}

		if (this.logPath) save(this.logPath, this.prefix, this.type, this.args)

	}

	deprecated() {
		this.type = "deprecated"
		this.args = Array.prototype.slice.call(arguments)
		let args = (Object.values(arguments))
		
		if (args.length == 1 && typeof args[0] === "string") {
			this.typeDisplay = this.types[this.type]
			this.argsDisplay = this.format(this.type, args[0])
			console.log(this.typeDisplay, this.prefixDisplay, chalk.inverse(args[0]))
		} else {
			this.argsDisplay = this.format(this.type, arguments)
			console.log.apply(console, this.argsDisplay)
		}

		if (this.logPath) save(this.logPath, this.prefix, this.type, this.args)
	}

	time(label) {
		// if (!this._debug) return
		if (typeof label === "string" || label == undefined) {
			let newLabel
			if (!label) newLabel = `${this.performancePrefix}`
			else newLabel = `${this.performancePrefix}/${label}`
			console.time(newLabel)
		}
		else return console.error("performance timer lable must be a string!")

	}

	timeEnd(label) {
		// if (!this._debug) return
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

	spacer(n) {
		n = n ?? 0
		let line = "\n".repeat(n)
		console.log(chalk.dim("––––––––––––––––––––––––––"), line)
	}
	
}

function save(logPath, prefix, type, input) {
	// input = JSON.stringify(input, null)
	let obj = `${ts}, "${prefix}", ${type}, "${input}"\n`
	fs.appendFile(logPath, obj, function(error) {
		if (error) {
			console.error("(logger) error saving log", error)
		}
	})
}


module.exports = Logger

