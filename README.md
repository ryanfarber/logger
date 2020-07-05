# rf-logger

A simple logging utility with a save function.

### Setup
The first parameter takes a name or a label that will prefix the log.  Usually it's best to just use the name of whatever script is running the logger.
If you want to save, the logs to a file, use `{ save: true }`.
It will default save to `./logs.log`.
Otherwise, you can specify the path in options:
```javascript 
const logger = new Logger({ label: "myscript.js", save: false, path: "./logs.log" });
```
It will save with timestamps in CSV format.

Timestamp format: `YYMMDD HH:mm:ss.ms`

If you want to import it to a spreadsheet, just change the extension `.log` to `.csv`.

### Example
```javascript
const Logger = require("./index.js");
const logger = new Logger({ label: "myscript.js", save: false, path: "./logs.log" });

logger.log("hello world")
// (myscript.js) hello world

logger.error("hello error")
// (myscript.js) ERROR hello error

logger.warn("hello warning")
// (myscript.js) WARN hello warning
```

### Saved Output
```
200705 03:51:16.473, test.js, log, "hello world"
200705 03:51:16.473, test.js, error, "hello error"
200705 03:51:16.473, test.js, warn, "hello warning"
```
 
