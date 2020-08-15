// test.js

const Logger = require("./index.js");
const logger = new Logger({filename: "test.js", save: false});

logger.log("hello world")
logger.info("hello info")
logger.warn("hello warning")
logger.error("hello error")
logger.debug("hello debug")
