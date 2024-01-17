// Logger_V3.js

const path = require("path")
const util = require("util")
const chalk = require("chalk")
// const axios = require("axios")


let types = {
	log: {

	},
	info: {

	},
	warn: {

	},
	error: {

	},
	debug: {

	},
	inspect: {

	}
}


let styles = [
	`{level} [{name}] {data}`
]




class Logger {
	constructor(name, config = {}) {

		this.name = name || "logger"
		this.types = Object.keys(types)
		this.usePapertrail = config.usePapertrail ?? false

		const papertrailKey = config.papertrailKey

		let inspectOptions = {
			depth: 10,
			maxArrayLength: null
		}



		if (this.name !== path.basename(this.name)) this.name = path.parse(this.name).name
		if (this.usePapertrail && !papertrailKey) console.warn(`[logger] please enter a papertrail key to use this feature of logger`)

		for (let [type, val] of Object.entries(types)) {
			this[type] = function() {
				let prefix = format(type)
				let args = Array.prototype.slice.call(arguments)
				let numArgs = Object.values(args).length
				
				let data = types[type]
				if (data.hasOwnProperty("highlight") && args.length && typeof args[0] === "string") args[0] = data.highlight(args[0])
				if (prefix) args.unshift(prefix)

				if (type == "deprecated") console.log.apply(console, args)
				else if (type == "debug" && this._debug == false) return
				else if (type == "inspect") return console.log(util.inspect(args[0], inspectOptions))
				else if (!console.hasOwnProperty(type)) return console.log(`"${type}" is not a console type`)
				else console[type].apply(console, args)
			}
		}

		function format(type) {
			let {color} = types[type]
			
		}

	}
}



module.exports = Logger
