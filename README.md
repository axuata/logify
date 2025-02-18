<details>
  <summary>1.0.1 Changelog</summary>

  - Renewed README.md (I was thinking of compiling it into Axulibs, but since it's a small-scale library, I believe it's best to write it here.)
  - Added LICENSE
</details>

# What is Logify?
**Logify** is a lightweight **TypeScript logger library** developed by **Axuata**.

## Features
- Log messages with different log levels: `LOG`, `DEBUG`, `INFO`, `WARN`, `ERROR`
- Insert timestamps in logs
- Simple and chainable API

# Installation
Do you want to know how to install this package?

## Prerequisites
- Use the **latest** stable LTS version of [Node.js](https://nodejs.org).
- Use the **latest** version of [Typescript](https://www.typescriptlang.org/).

### npm
```bash
npm install @axuata/logify
```

### yarn
```bash
yarn add @axuata/logify
```

# License
Copyright (c) 2025 Axuata.  
This package is licensed under the MIT License.

# Tips
- `LogLevel` corresponds to the log level labels inside the square brackets (e.g., `[INFO]`, `[ERROR]`, etc.).
- `OutType` represents the console method that will be used for output (e.g., `OutType.DEBUG` maps to `console.debug`, `OutType.ERROR` maps to `console.error`).

# Functions
## Core / Logger
- `log(logLevel: LogLevel, message: string): this`
    - The entry point of the logging process.
    - This method must be called first in the method chain.
    - ```typescript
      logger.log(LogLevel.LOG, "Hello World").out(OutType.LOG);
      ```
- `.insertTimestamp(position: InsertPosition): this`
    - Inserts the current timestamp at the beginning of the log message.
    - ```typescript
      logger.log(LogLevel.LOG, "Hello World").insertTimestamp(InsertPosition.BEFORE).out(OutType.LOG);
      ```
- `.insertCustomTimestamp(format: string, position: InsertPosition): this`
    - Inserts a custom timestamp at the beginning of the log message.
    - ```typescript
      logger.log(LogLevel.LOG, message).insertCustomTimestamp('[Y]-[MM]-[DD] [hh]:[mm]:[ss] (UTC[timezoneOffset])', InsertPosition.BEFORE).out(OutType.LOG);
      ```
- `.insertCustomPrefix(prefix: string, position: InsertPosition): this`
    - Inserts a custom prefix at the beginning of the log message.
    - ```typescript
      logger.log(LogLevel.LOG, message).insertCustomPrefix('⚡', InsertPosition.BEFORE).out(OutType.LOG);
      ```
- `.startGroup(label: string): this`
    - Starts a group.
    - ```typescript
      logger.log(LogLevel.LOG, message).startGroup('hello').out(OutType.LOG);
      ```
- `.endGroup(): this`
    - Ends a group.
    - ```typescript
      logger.log(LogLevel.LOG, message).endGroup().out(OutType.LOG);
      ```
- `.out(outType: OutType): void`
    - The exit point of the logging process.
    - ```typescript
      logger.log(LogLevel.LOG, message).endGroup().out(OutType.LOG);
      ```