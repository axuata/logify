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

  insertTimestamp(): this {
    const date = new Date();
    const timestamp = `[${date.toLocaleString()} (UTC+${-(date.getTimezoneOffset() / 60)})] `
    this.message = timestamp + this.message;

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