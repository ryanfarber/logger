# rf-logger

A simple logger utility with a save function.

### Options
If you want to save, the logs to a file, use `{ save: true }`.
It will default save to `./logs.log`.
Otherwise, you can specify the path in options:
```javascript 
const logger = new Logger("test.js", { save: true, path: "./logs.log" });
```
It will save with timestamps in CSV format.  If you want to import it to a spreadsheet, just change the extension `.log` to `.csv`.

### Example
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

### Saved Output
```
200705 03:51:16.473, test.js, log, "hello world"
200705 03:51:16.473, test.js, error, "hello error"
200705 03:51:16.473, test.js, warn, "hello warning"
```
 
