// test.js

const Logger = require("./index.js");
const logger = new Logger({label: "test.js", customLog: "fatality", save: true});

logger.log("hello world")
// (test.js) hello world

logger.info("hello info")
// (test.js) hello world

logger.warn("hello warning")
// (test.js) WARN hello warning

logger.error("hello error")
// (test.js) ERROR hello error

logger.custom("hello custom")
// (test.js) FATALITY hello custom