# logger

A simple logging utility

### usage
```javascript
const Logger = require("@ryanforever/logger")
const logger = new Logger(__filename, {debug: true,})

logger.log("hello world")
logger.info("hello info")
logger.warn("hello warning")
logger.error("hello error")
logger.debug("hello debug")
logger.inspect({this: {is: {a: {deeply: {nested: "object"}}}}})
```

### use papertrail
you can add logs to [Papertrail](https://papertrailapp.com)
```javascript
const Logger = require("@ryanforever/logger")
const logger = new Logger(__filename, {
	usePapertrail: true,
	papertrailKey: process.env.PAPERTRAIL_KEY
})
```
