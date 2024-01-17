// test-v3.js


const Logger = require("../src/Logger-v3.js")

const logger = new Logger(__filename, {usePapertrail: true})




console.log(logger)
// logger.log("hey there ")
logger.inspect({hey: {there: "bopy", troopy: {is: {a:{booper: "test"}}}}})