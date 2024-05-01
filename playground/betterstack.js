// https-test.js


const axios = require("axios")



let url = `https://in.logs.betterstack.com`



axios({
	method: "POST",
	url,
	headers: {
		Authorization: `Bearer CntLJBLEzyy84iCYaDrhWi7G`
	},
	data: {
		dt: Date.now(),
		message: {this: {is: {a: "test"}}},

		level: "error"
	}
}).then(console.log)