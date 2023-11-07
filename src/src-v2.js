// src.js

const fs = require("fs")
const path = require("path")
const timestamp = require("time-stamp")
const util = require("util")
const chalk = require("chalk")

var ts = timestamp("YYMMDD HH:mm:ss.ms")

let styles = {
	dim: chalk.dim,
	name: chalk.hex("0096ff"),
	nameUnderline: chalk.underline.hex("0096ff"),
	bold: chalk.bold,
	bracket: (input) => `[${input}]`
}

let nameStyles = [
	(name) => name,
	(name) => `[${name}]`,
	(name) => chalk.underline(name),
	(name) => name,
	(name) => name,
	(name) => name
]



let colors = {
	white: "ffffff",
	red: "ff2600",
	orange: "ff9300",
	yellow: "fffb00",
	blue: "0096ff",
	magenta: "ff40ff",
	lightgrey: "808080",
	darkgrey: "404040"
}

let types = new Map([
	["log", {color: chalk.bold.hex(colors.white), display: "  log", display2: "log  "}],
	["info", {color: chalk.bold.hex(colors.lightgrey), highlight: chalk.hex(colors.lightgrey), display: " info", display2: "info "}],
	["warn", {color: chalk.bold.hex(colors.orange), highlight: chalk.hex(colors.orange), display: " warn", display2: "warn "}],
	["error", {color: chalk.bold.hex(colors.red), highlight: chalk.hex(colors.red), display: "error", display2: "error"}],
	["debug", {color: chalk.bold.hex(colors.darkgrey), highlight: chalk.hex(colors.darkgrey), display: "debug", display2: "debug"}],
	["deprecated", {color: chalk.bold.hex(colors.magenta), highlight: chalk.hex(colors.magenta)}],
])


function Logger(name, config = {}) {

	this.name = name || "logger"
	let styleTypes = [0, 1, 2, 3, 4, 5, 6]
	let style = (config.style > -1) ? config.style : 1
	const showName = config.showName || true
	this._debug = (config.debug == false) ? false : true
	const labels = config.labels ?? true
	if (labels === false) style = 0


	// if name is a filepath
	if (this.name !== path.basename(this.name)) this.name = path.parse(this.name).name

	this.types = Array.from(types.keys())
	
	// iterate thru types and create a logger
	for (let type of Array.from(types.keys())) this[type] = function() {
		let prefix = format(type)
		let args = Array.prototype.slice.call(arguments)
		let numArgs = Object.values(args).length
		
		let data = types.get(type)
		if (data.hasOwnProperty("highlight") && args.length && typeof args[0] === "string") args[0] = data.highlight(args[0])
		if (prefix) args.unshift(prefix)

		if (type == "deprecated") console.log.apply(console, args)
		else if (type == "debug" && this._debug == false) return
		else if (!console.hasOwnProperty(type)) return console.log(`"${type}" is not a console type`)
		else console[type].apply(console, args)
		// console[type](prefix, arguments)
	}

	// START // performance start
	this.start = function(label) {
		label = styles.dim("[speed] " + this.name + "/" + label)
		console.time(label)
	}
	this.time = this.start

	// STOP // performance end
	this.stop = function(label) {
		label = styles.dim("[speed] " + this.name + "/" + label)
		console.timeEnd(label)
	}
	this.end = this.stop
	this.timeEnd = this.stop

	// LINE // log a line separator
	this.line = function(n) {
		n = n || 10
		let line = "–".repeat(n)
		console.log(styles.dim(line))
	}

	// SPACER // log a space
	this.space = function(n) {
		n = n || 0
		let space = "\n".repeat(n)
		console.log(space)
	}



	// TEST// test all functions
	this._test = function(...args) {
		this.start("performance")
		if (!this._debug) console.log("debug is off.")
		this.types.forEach(type => this[type](...args))	
		this.space()
		this.stop("performance")
		this.line()
	}


	let format = (type, ...args) => {
		let output
		let prefix
		let name = this.name
		let underline = chalk.underline
		let {color, display, display2} = types.get(type)
		if (!color) color = (input) => input

		if (display) type = display

		// if (!color) color = function(...args) {return ...args}

		if (!styleTypes.includes(style)) style = 1
		if (!showName) return output = type
		if (style == 0) {
			output = ""
		} else if (style == 1) {
			type = color(type)
			name = styles.name(`[${this.name}]`)
			output = type + " " + name
		} else if (style == 2) {
			type = color(type)
			name = styles.name(this.name)
			name = styles.nameUnderline(this.name)
			output = type + styles.dim("/") + name
		} else if (style == 3) {
			output = type + " " + name
		} else if (style == 4) {
			output = color(type) + "/" + styles.name(name) + " |"
		} else if (style == 5) {
			output = color(type) + ":" + name
		} else if (style == 6) {
			if (display2) type = display2
			// type = color(type)
			output = styles.name(`[${this.name}]`) + " " +color(type)
		}  
		return output
	}

}


const logger = new Logger(__filename, {debug: true, style: 1})

module.exports = Logger

