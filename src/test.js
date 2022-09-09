// test.js


const Logger = require("./index.js").v2
const logger = new Logger("logger-test", {debug: false, style: 1})

// logger._debug = false
logger._test("hello world")

logger.space(2)