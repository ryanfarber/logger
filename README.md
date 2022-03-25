# logger

A simple logging utility with a save function.

```javascript
// script.js

const Logger = require("@ryanforever/logger");
const logger = new Logger(__filename, {debug: false});

logger.log("hello world")
// LOG @ script: hello world
```


### usage
```javascript
// script.js

const Logger = require("@ryanforever/logger")
const logger = new Logger(__filename, {
	debug: true,
	save: true,
	path: "./logs.log"
})

logger.log("hello world")
//   LOG @ script: hello world goodbye

logger.info("hello info")
//  INFO @ script: hello info

logger.warn("hello warning")
//  WARN @ script: hello warning

logger.error("hello error")
// ERROR @ script: hello error

// if debug is false or undefined in config, logger.debug will not show up
logger.debug("hello debug")
// DEBUG @ script: hello debug
```

### saved output
```
200803 00:16:54.436, "myscript.js", log, "hello world"
200803 00:16:54.436, "myscript.js", info, "hello info"
200803 00:16:54.436, "myscript.js", error, "hello error"
200803 00:16:54.436, "myscript.js", warn, "hello warning"
200803 00:16:54.436, "myscript.js", fatality, "hello custom"
```
 
