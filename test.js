// test.js



const Logger = require("./src").v2
const logger1 = new Logger("test-logger")

logger1.debug("hello world")
logger1.log("hello world")
logger1.info("hello world")
logger1.warn("hello world")
logger1.error("hello world")
logger1.deprecated("hello world")

const logger2 = new Logger("test-logger", {style: 6})

logger2.debug("hello world")
logger2.log("hello world")
logger2.info("hello world")
logger2.warn("hello world")
logger2.error("hello world")
logger2.deprecated("hello world")