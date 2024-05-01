// Logger-v4.js

const path = require("path")
const util = require("util")
const chalk = require("chalk")
const {styles, colors} = require("./templates.js")







class Logger {
	constructor(name, config = {}) {

		let debug = config.debug

		this.config = {
			prefix: config.prefix || `[name]`,
			suffix: config.suffix,
			timestamp: config.timestamp || false,
			inspectDepth: config.inspectDepth ?? 10,
			inspectMaxArrayLength: config.inspectMaxArrayLength ?? null
		}

		const betterstackToken = config.betterstackToken

		let axios = {}

		if (betterstackToken) {
			axios = require("axios").create({
				baseURL: "https://in.logs.betterstack.com",
				headers: {Authorization: `Bearer ${betterstackToken}`}
			})
		}

		let methods = [
			{type: "log", level: "log"},
			{type: "info", level: "info"},
			{type: "warn", level: "warn", suffix: true, style: chalk.bold.yellow},
			{type: "error", level: "error", suffix: true, style: chalk.bold.red},
			{type: "debug", level: "debug", style: chalk.dim},
			{type: "deprecated", level: "warn", suffix: true, style: chalk.bold.yellow}
			// {type: "inspect"}
		]

		this.name = name
		let settings = this.config

		// parse name
		if (this.name && this.name !== path.basename(this.name)) this.name = path.parse(this.name).name


		// init methods
		for (let method of methods) {
			let type = method.type
			let level = method.level
			let style = method.style

			this[type] = function() {
				if (type == "debug" && !debug) return

				// apply style
				if (style) {
					for (let [key, val] of Object.entries(arguments)) {
						if (typeof val === "string") arguments[key] = style(val)
					}
				}

				let args = Array.prototype.slice.call(arguments)
				
				if (settings.prefix) {
					let prefix = parse(settings.prefix)
					if (style) prefix = style(prefix)
					else prefix = styles.blue(prefix)
					args.unshift(prefix)
				}

				if (method.suffix) {
					if (style) args.push(style(`[${method.type.toUpperCase()}]`))
					else args.push(`[${method.type.toUpperCase()}]`)
				}

				if (settings.suffix) {
					let suffix = parse(settings.suffix)
					if (style) suffix = style(suffix)
					args.push(suffix)
				}
				if (settings.timestamp) args.push(`@ ${new Date(Date.now()).toLocaleString()}`)

				console[level].apply(console, args)

				if (betterstackToken) logToBetterstack(args, level)
			}
		}

		this.inspect = function(input) {
			console.log(util.inspect(input, {depth: settings.inspectDepth, maxArrayLength: settings.inspectMaxArrayLength}))
		}


		async function logToBetterstack(args, level) {
			let data = []
			args.forEach(arg => {
				if (typeof arg === "object") arg = JSON.stringify(arg, 1)
				data.push(arg)
			})
			data = data.join(" ")
			axios.post("/", {
				dt: Date.now(),
				message: data,
				level
			}).catch(err => {
				console.error(`BETTERSTRACK ERROR:`, err.message)
			})
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


