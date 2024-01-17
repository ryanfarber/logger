// test-v2.js

// test-v3.js

require("dotenv").config({path: "../.env"})
const Logger = require("../src/Logger-v2.js")
const logger = new Logger(__filename, {usePapertrail: true, papertrailKey: process.env.PAPERTRAIL_KEY})




console.log(logger)
// logger.log("hey there ")
logger.log("hey there")