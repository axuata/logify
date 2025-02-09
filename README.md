<details>
  <summary>0.3.0 Changelog</summary>

  - Add InsertPosition for each ***Insert*** methods
</details>

# What is Logify?
**Logify** is a lightweight TypeScript logger library developed by Axuata.

# Features
- Log messages with different log levels: `LOG`, `DEBUG`, `INFO`, `WARN`, `ERROR`
- Insert timestamps in logs
- Simple and chainable API

# Installation
## npm
```bash
npm install @axuata/logify
```
## yarn
```bash
yarn add @axuata/logify
```

# Example
```typescript
// import
import {Logger, LogLevel, OutType} from "./logger";

// instantiation
const logger = new Logger(); // Using 'let' is also OK

// Logging without timestamp
logger.log(LogLevel.LOG, 'Hello World without timestamp').out(OutType.LOG);

// Logging with timestamp (Using insertTimestamp())
logger.log(LogLevel.LOG, 'Hello World with timestamp').insertTimestamp(InsertPosition.BEFORE).out(OutType.LOG);

// Logging with a custom timestamp (Using insertCustomTimestamp)
logger.log(LogLevel.LOG, 'Hello World with a custom timestamp').insertCustomTimestamp('YYYY/MM/DD HH:mm:ss Z', InsertPosition.BEFORE).out(OutType.LOG);

// You can use different levels!
logger.log(LogLevel.LOG, 'Hello World').out(OutType.LOG);
logger.log(LogLevel.DEBUG, 'Hello World').out(OutType.DEBUG);
logger.log(LogLevel.INFO, 'Hello World').out(OutType.INFO);
logger.log(LogLevel.WARN, 'Hello World').out(OutType.WARN);
logger.log(LogLevel.ERROR, 'Hello World').out(OutType.ERROR);
```
```log
[LOG] Hello World without timestamp
[2025/2/7 16:12:12 (UTC+9)] [LOG] Hello World with timestamp
[2025/2/7 16:12:12 (UTC+9)] [LOG] Hello World with a custom timestamp
[LOG] Hello World
[DEBUG] Hello World
[INFO] Hello World
[WARN] Hello World
[ERROR] Hello World
```

# Caution
- The `log` method must be the **first** method in the chain.
- The `out` method must be the **last** method in the chain.
- Methods with ``insert`` in their name have higher priority the further they are towards the end.
  - for Example:
  - ```typescript
    logger.log(LogLevel.LOG, 'Hello World').insertCustomTimestamp('HH:mm:ss').insertTimestamp().out(OutType.LOG);
    ```
  - will be:
  - ```log
    [2025/1/8 10:25:55 (UTC+9)] [10:25:55] [LOG] Hello World
    ```

# Tips
- `LogLevel` corresponds to the log level labels inside the square brackets (e.g., `[INFO]`, `[ERROR]`, etc.).
- `OutType` represents the console method that will be used for output (e.g., `OutType.DEBUG` maps to `console.debug`, `OutType.ERROR` maps to `console.error`).

# License
Copyright (c) 2025 Axuata.  
This package is licensed under the MIT License.  

# Methods
## Logger Class (Core)
- ``log(logLevel: LogLevel, message: string): this``
  - The entry point of the logging process.  
  - This method must be called first in the method chain.
  - ```typescript
    logger.log(LogLevel.LOG, "Hello World").out(OutType.LOG);
    ```
- ``.insertTimestamp(position: InsertPosition): this``
  - Inserts the current timestamp at the beginning of the log message.
  - ```typescript
    logger.log(LogLevel.LOG, "Hello World").insertTimestamp(InsertPosition.BEFORE).out(OutType.LOG);
    ```
- ``.insertCustomTimestamp(format: string, position: InsertPosition): this``
  - Inserts a custom timestamp at the beginning of the log message.
  - ```typescript
    logger.log(LogLevel.LOG, message).insertCustomTimestamp('YYYY/MM/DD HH:mm:ss Z', InsertPosition.BEFORE).out(OutType.LOG);
    ```
- ``.insertCustomPrefix(prefix: string, position: InsertPosition): this``
  - Inserts a custom prefix at the beginning of the log message.
  - ```typescript
    logger.log(LogLevel.LOG, message).insertCustomPrefix('⚡', InsertPosition.BEFORE).out(OutType.LOG);
    ```