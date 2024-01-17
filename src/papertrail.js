// papertrail.js

const axios = require("axios")


async function papertrail(key, data) {
	data = Log(data)

	return await axios({
		url: "https://logs.collector.solarwinds.com/v1/log",
		method: "POST",
		data,
		auth: {password: key}
	}).catch(console.error)
}





function Log(d = {}) {

	let obj = {
		type: d.type || d.level,
		file: d.file || d.name,
		message: d.message
	}


	return JSON.stringify(obj, null, 2)
}


module.exports = papertrail
