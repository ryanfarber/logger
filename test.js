// test.js



const Logger = require("./src").v2
const logger = new Logger("test-logger")

logger.debug("hello world")
logger.log("hello world")
logger.info("hello world")
logger.warn("hello world")
logger.error("hello world")
logger.deprecated("hello world")