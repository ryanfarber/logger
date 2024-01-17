// papertrail.js

const axios = require("axios")

async function papertrail(key, data) {
	return await axios({
		url: "https://logs.collector.solarwinds.com/v1/log",
		method: "POST",
		data,
		auth: {password: key}
	}).catch(console.error)
}

module.exports = papertrail