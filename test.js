// test.js

const Logger = require("./index.js");
const logger = new Logger("test.js", { save: false, path: "./logs.log" });

logger.log("hello world")
// (test.js) hello world

logger.error("hello error")
// (test.js) ERROR hello error

logger.warn("hello warning")
// (test.js) WARN hello warning