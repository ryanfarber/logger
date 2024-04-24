// test-v4.js



const Logger = require("../src").v4
const logger = new Logger("test", {debug: true, timestamp: false,})


console.log(logger)


logger.log({hey: {there: "world", how: {are: {you: {doing: "?"}}}}})
logger.inspect({hey: {there: "world", how: {are: {you: {doing: "?"}}}}})
logger.log("log")
logger.info("info")
logger.warn("warning")
logger.error("error")
logger.debug("debug")