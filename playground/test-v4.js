// test-v4.js



// const Logger = require("../src").v4
const Logger = require("@ryanforever/logger").v4
const logger = new Logger("test", {debug: true})


console.log(logger)


logger.log({hey: {there: "world", how: {are: {you: {doing: "?"}}}}})
logger.inspect({hey: {there: "world", how: {are: {you: {doing: "?"}}}}})
logger.log("log")
logger.info("info")
logger.warn("warning")
logger.error("error")
logger.debug("debug")