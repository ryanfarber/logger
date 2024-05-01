// test-v4.js



const Logger = require("../src").v4
// const Logger = require("@ryanforever/logger").v4
const logger = new Logger("test", {debug: true, betterstackToken: "CntLJBLEzyy84iCYaDrhWi7G"})
const {log} = logger

console.log(logger)


// logger.log({hey: {there: "world", how: {are: {you: {doing: "?"}}}}})
// logger.inspect({hey: {there: "world", how: {are: {you: {doing: "?"}}}}})
logger.log("this is a log message")
logger.info("this is an info message")
logger.warn("this is a warning message")
logger.error("this is an error message")
logger.debug("this is a debug message")



// logger.log({hey: {there: "world", how: {are: {you: {doing: "?"}}}}})
// logger.error("this is an error")