// templates.js

const chalk = require("chalk")



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

let styles = {
	dim: chalk.dim,
	name: chalk.hex("0096ff"),
	nameUnderline: chalk.underline.hex("0096ff"),
	bold: chalk.bold,
	blue: chalk.hex(colors.blue),
	bracket: (input) => `[${input}]`
}


module.exports = {colors, styles}