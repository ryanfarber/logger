// test.js


const Logger = require("./src.js")
const logger = new Logger(__filename, {debug: true, simple: false})


logger.time("performance")
logger.log("hello world", "goodbye")
logger.info("hello info")
logger.warn("hello warning")
logger.error("hello error")
logger.debug("hello debug")
logger.deprecated("hello depcrecated")

logger.timeEnd("performance")

