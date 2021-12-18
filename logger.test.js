// test.js


const Logger = require("./index.js")
const logger = new Logger(__filename)


logger.time("hey")
logger.log("hello world", "goodbye")
logger.info("hello info")
logger.warn("hello warning")
logger.error("hello error")
logger.debug("hello debug")

logger.timeEnd("hey")

