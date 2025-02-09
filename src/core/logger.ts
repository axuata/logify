// Copyright (c) 2025 Axuata.
// This code is licensed under the MIT License.
// https://opensource.org/licenses/MIT

export enum LogLevel {
  LOG,
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

export enum OutType {
  LOG,
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

export enum InsertPosition {
  BEFORE,
  AFTER,
}

export class Logger {
  private message: string = '';

  log(logLevel: LogLevel, message: string): this {
    switch (logLevel) {
      case LogLevel.LOG:
        this.message += `[LOG] ${message}`;
        break;
      case LogLevel.DEBUG:
        this.message += `[DEBUG] ${message}`;
        break;
      case LogLevel.INFO:
        this.message += `[INFO] ${message}`;
        break;
      case LogLevel.WARN:
        this.message += `[WARN] ${message}`;
        break;
      case LogLevel.ERROR:
        this.message += `[ERROR] ${message}`;
        break;
      default:
        this.message += `[LOG] ${message}`;
        break;
    }

    return this;
  }

  insertTimestamp(position: InsertPosition): this {
    const date = new Date();
    const timestamp = `[${date.toLocaleString()} (UTC+${-(date.getTimezoneOffset() / 60)})]`

    if (position === InsertPosition.BEFORE) {
      this.message = timestamp + ' ' + this.message;
    } else {
      this.message = this.message + ' ' + timestamp;
    }

    return this;
  }

  insertCustomTimestamp(format: string, position: InsertPosition): this {
    const date = new Date();
    let result: string = '';

    result = format
      .replace(/YYYY/g, date.getFullYear().toString())
      .replace(/MM/g, date.getMonth().toString())
      .replace(/DD/g, date.getDate().toString())
      .replace(/HH/g, date.getHours().toString())
      .replace(/mm/g, date.getMinutes().toString())
      .replace(/ss/g, date.getSeconds().toString())
      .replace(/sss/g, date.getMilliseconds().toString())
      .replace(/Z/g, `(UTC+${-(date.getTimezoneOffset() / 60)})`)

    if (position === InsertPosition.BEFORE) {
      this.message = '[' + result + '] ' + this.message;
    } else {
      this.message = this.message + ' [' + result + ']';
    }

    return this;
  }

  insertCustomPrefix(prefix: string, position: InsertPosition): this {
    if (position === InsertPosition.BEFORE) {
      this.message = prefix + ' ' + this.message;
    } else {
      this.message = this.message + ' ' + prefix;
    }

    return this;
  }

  out(outType: OutType): void {
    switch (outType) {
      case OutType.LOG:
        console.log(this.message);
        break;
      case OutType.DEBUG:
        console.debug(this.message);
        break;
      case OutType.INFO:
        console.info(this.message);
        break;
      case OutType.WARN:
        console.warn(this.message);
        break;
      case OutType.ERROR:
        console.error(this.message);
        break;
      default:
        console.log(this.message)
    }

    this.message = '';
  }
}