# rf-logger

A simple logger utility.

choose options:
If you just input
```javascript 
save: true
```
it will default save to `./logs.log`.

Otherwise, you can specify the path in options:
```javascript 
{ save: true, path: "./logs/mylog.log" }
```

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
 
