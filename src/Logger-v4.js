// Logger-v4.js

const path = require("path")
const util = require("util")
const chalk = require("chalk")
const {styles, colors} = require("./templates.js")






class Logger {
	constructor(name, config = {}) {

		let debug = config.debug

		this.config = {
			prefix: config.prefix || `{name}:`,
			suffix: config.suffix,
			timestamp: config.timestamp || false,
			inspectDepth: config.inspectDepth ?? 10,
			inspectMaxArrayLength: config.inspectMaxArrayLength ?? null
		}

		let methods = [
			{type: "log",},
			{type: "info"},
			{type: "warn", suffix: true, style: chalk.bold.yellow},
			{type: "error", suffix: true, style: chalk.bold.red},
			{type: "debug", style: chalk.dim},
			// {type: "inspect"}
		]

		this.name = name


		// parse name
		if (this.name && this.name !== path.basename(this.name)) this.name = path.parse(this.name).name


		// init methods
		for (let method of methods) {
			let type = method.type
			let style = method.style

			this[type] = function() {
				if (type == "debug" && !debug) return


				// apply style
				if (style) {
					for (let [key, val] of Object.entries(arguments)) arguments[key] = style(val)
				}

				let args = Array.prototype.slice.call(arguments)
				
				if (this.config.prefix) {

					let prefix = parse(this.config.prefix)
					if (style) prefix = style(prefix)
					else prefix = styles.blue(prefix)
					args.unshift(prefix)
				}

				if (method.suffix) {
					if (style) args.push(style(`[${method.type.toUpperCase()}]`))
					else args.push(`[${method.type.toUpperCase()}]`)
				}

				if (this.config.suffix) {
					let suffix = parse(this.config.suffix)
					if (style) suffix = style(suffix)
					args.push(suffix)
				}
				if (this.config.timestamp) args.push(`@ ${new Date(Date.now()).toLocaleString()}`)
				console[type].apply(console, args)
			}
		}

		this.inspect = function(input) {
			console.log(util.inspect(input, {depth: this.config.inspectDepth, maxArrayLength: this.config.inspectMaxArrayLength}))
		}

		const suffix = (type, style) => chalk.dim(`@ ${this.name}/${type}`)


		const parse = (template) => {
			return template
				.replace(/{name}|{filename}/gi, this.name)
				.replace(/{timetamp}|{ts}/, ts())
		}

		function ts() {
			return new Date(Date.now()).toLocaleString()
		}
	}
}






module.exports = Logger


