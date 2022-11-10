// test.js


const Logger = require("./index.js").v2
const logger = new Logger("logger-test", {debug: true, style: 1})

// logger._debug = false
logger._test("hello world")

logger.space(2)
logger.debug("hey")