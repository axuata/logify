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

    this.message = (position === InsertPosition.BEFORE)
      ? timestamp + ' ' + this.message
      : this.message + ' ' + timestamp;

    return this;
  }

  insertCustomTimestamp(format: string, position: InsertPosition): this {
    const date = new Date();
    let result: string = '';

    result = format
      .replaceAll('[Y]', date.getFullYear().toString())
      .replaceAll('[uY]', date.getUTCFullYear().toString())
      .replaceAll('[M]', (date.getMonth() + 1).toString())
      .replaceAll('[uM]', (date.getUTCMonth() + 1).toString())
      .replaceAll('[MM]', (date.getMonth() + 1).toString().padStart(2, '0'))
      .replaceAll('[uMM]', (date.getUTCMonth() + 1).toString().padStart(2, '0'))
      .replaceAll('[MMM]', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()])
      .replaceAll('[MMMM]', ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()])
      .replaceAll('[uMMM]', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getUTCMonth()])
      .replaceAll('[uMMMM]', ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getUTCMonth()])
      .replaceAll('[D]', date.getDate().toString())
      .replaceAll('[uD]', date.getUTCDate().toString())
      .replaceAll('[DD]', date.getDate().toString().padStart(2, '0'))
      .replaceAll('[uDD]', date.getUTCDate().toString().padStart(2, '0'))
      .replaceAll('[DDD]', (date.getDate()).toString() + ['st', 'nd', 'rd', 'th'][(date.getDate() % 10 > 3 || [11, 12, 13].indexOf(date.getDate()) !== -1) ? 3 : (date.getDate() % 10) - 1])
      .replaceAll('[uDDD]', (date.getUTCDate()).toString() + ['st', 'nd', 'rd', 'th'][(date.getUTCDate() % 10 > 3 || [11, 12, 13].indexOf(date.getUTCDate()) !== -1) ? 3 : (date.getUTCDate() % 10) - 1])
      .replaceAll('[h]', date.getHours().toString())
      .replaceAll('[uh]', date.getUTCHours().toString())
      .replaceAll('[hh]', date.getHours().toString().padStart(2, '0'))
      .replaceAll('[uhh]', date.getUTCHours().toString().padStart(2, '0'))
      .replaceAll('[m]', date.getMinutes().toString())
      .replaceAll('[um]', date.getUTCMinutes().toString())
      .replaceAll('[mm]', date.getMinutes().toString().padStart(2, '0'))
      .replaceAll('[umm]', date.getUTCMinutes().toString().padStart(2, '0'))
      .replaceAll('[s]', date.getSeconds().toString())
      .replaceAll('[us]', date.getUTCSeconds().toString())
      .replaceAll('[ss]', date.getSeconds().toString().padStart(2, '0'))
      .replaceAll('[uss]', date.getUTCSeconds().toString().padStart(2, '0'))
      .replaceAll('[l]', date.getMilliseconds().toString())
      .replaceAll('[ul]', date.getUTCMilliseconds().toString())
      .replaceAll('[ll]', date.getMilliseconds().toString().padStart(3, '0'))
      .replaceAll('[ull]', date.getUTCMilliseconds().toString().padStart(3, '0'))
      .replaceAll('[w]', ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()])
      .replaceAll('[uw]', ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getUTCDay()])
      .replaceAll('[ww]', ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()])
      .replaceAll('[uww]', ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getUTCDay()])
      .replaceAll('[timezoneOffsetHours]', `${-(date.getTimezoneOffset() / 60) >= 0 ? '+' : ''}${-(date.getTimezoneOffset() / 60)}`)
      .replaceAll('[timezoneOffsetMinutes]', `${-(date.getTimezoneOffset()) >= 0 ? '+' : ''}${-(date.getTimezoneOffset())}`)
      .replaceAll('[iso8601]', date.toISOString());

    this.message = (position === InsertPosition.BEFORE)
      ? '[' + result + '] ' + this.message
      : this.message + ' [' + result + ']';

    return this;
  }

  insertCustomPrefix(prefix: string, position: InsertPosition): this {
    this.message = (position === InsertPosition.BEFORE)
      ? prefix + ' ' + this.message
      : this.message + ' ' + prefix;

    return this;
  }

  startGroup(label: string): this {
    console.group(label);
    return this;
  }

  endGroup(): this {
    console.groupEnd();
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