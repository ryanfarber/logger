// test.js

const Logger = require("./index.js");
const logger = new Logger({filename: "test.js", save: false});
const timestamp = require("time-stamp");
let ts = timestamp("HH:mm:ss.ms");

logger.log("hello world")
logger.info("hello info")
logger.warn("hello warning")
logger.error("hello error")
