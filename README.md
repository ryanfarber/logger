# rf-logger

A simple logging utility with a save function.

### Setup
The first parameter takes a name or a label that will prefix the log.  Usually it's best to just use the name of whatever script is running the logger.
If you want to save, the logs to a file, use `{ save: true }`.
It will default save to `./logs.log`.
Otherwise, you can specify the path in options:
```javascript 
const logger = new Logger({ filename: "myscript.js", save: false, path: "./logs.log" });
```
It will save with timestamps in CSV format.

Timestamp format: `YYMMDD HH:mm:ss.ms`

If you want to import it to a spreadsheet, just change the extension `.log` to `.csv`.

### Custom Log Name
You can add a custom log name by adding it to settings. 
```javascript 
const logger = new Logger({ filename: "myscript.js", customLog: "fatality"});

logger.custom("this might be bad")
// (myscript.js) FATALITY this might be bad
```

### Example
```javascript
const Logger = require("./index.js");
const logger = new Logger({ filename: "myscript.js", save: false, path: "./logs.log", customLog: "fatality" });

logger.log("hello world")
// (myscript.js) hello world 

logger.info("hello info")
// (myscript.js) INFO hello info

logger.warn("hello warning")
// (myscript.js) WARN hello warning

logger.error("hello error")
// (myscript.js) ERROR hello error

logger.custom("hello custom")
// (myscript.js) FATALITY hello custom
```

### Saved Output
```
200803 00:16:54.436, "test.js", log, "hello world"
200803 00:16:54.436, "test.js", info, "hello info"
200803 00:16:54.436, "test.js", error, "hello error"
200803 00:16:54.436, "test.js", warn, "hello warning"
200803 00:16:54.436, "test.js", fatality, "hello custom"
```
 
