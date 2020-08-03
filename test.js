// test.js

const Logger = require("./index.js");
const logger = new Logger({label: "test.js", customLog: "lol", save: true});

logger.log("hello world")
// (test.js) hello world

logger.info("hello info")
// (test.js) hello world

logger.error("hello error")
// (test.js) ERROR hello error

logger.warn("hello warning")
// (test.js) WARN hello warning

logger.custom("hello custom")
// (test.js) LOL hello custom