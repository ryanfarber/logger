# rf-logger

A simple logger utility.

### options
If you want to save, the logs to a file, use `{ save: true }`.
It will default save to `./logs.log`.
Otherwise, you can specify the path in options:
```javascript 
const logger = new Logger("test.js", { save: true, path: "./logs.log" });
```


### example
```javascript
const Logger = require("./index.js");
const logger = new Logger("test.js", { save: false, path: "./logs.log" });

logger.log("hello world")
// (test.js) hello world

logger.error("hello error")
// (test.js) ERROR hello error

logger.warn("hello warning")
// (test.js) WARN hello warning
```
 
