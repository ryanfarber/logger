// test.js

const Logger = require("./index.js");
const logger = new Logger({filename: "test.js", save: false});
const timestamp = require("time-stamp");
let ts = timestamp("HH:mm:ss.ms");

logger.log("hello world")
// (test.js) hello world

logger.info("hello info")
// (test.js) hello world

logger.warn("hello warning")
// (test.js) WARN hello warning

logger.error("hello error")
// (test.js) ERROR hello error


var obj = {
	foo: "bar",
	baz: "bum",
}

logger.log(ts)