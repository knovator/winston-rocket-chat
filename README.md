# winston-RocketChat-webhook-transport

A Rocket chat transport for Winston 3+ that logs to a channel via webhooks.


## Installation

```
npm install winston @knovator/winston-rocket-chat
```

## Usage

### Set up with transports

```javascript
const winston = require("winston");
const {RocketChatHook} = require("@knovator/winston-rocket-chat");

const logger = winston.createLogger({
    level: "info",
    transports: [
        new RocketChatHook({
            webhookUrl: "https://knovator.rocket.chat/hooks/XXXXX/XXXX"
        })
    ]
});

logger.info("This should now appear on Rocket Chat");
```

### Set up by adding

```javascript
const winston = require("winston");
const {RocketChatHook} = require("@knovator/winston-rocket-chat");

const logger = winston.createLogger({});

logger.add(new RocketChatHook({ webhookUrl: "https://knovator.rocket.chat/hooks/XXXXX/XXXX" }));
```

### Options

* `webhookUrl` **REQUIRED** - Rocket Chata incoming webhook URL. [Follow steps at this link to create a new webhook if you don't already have one](https://docs.rocket.chat/guides/administration/admin-panel/integrations).
* `level` - Level to log. Global settings will apply if left undefined.
* `proxy` - Allows specifying a proxy server that [gets passed directly down to Axios](https://github.com/axios/axios#request-config) (Default: `undefined`)
