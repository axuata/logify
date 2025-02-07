// Copyright (c) 2025 Axuata.
// This code is licensed under the MIT License.
// https://opensource.org/licenses/MIT

import {describe, expect, it, vi} from "vitest";
import {Logger, LogLevel, OutType} from "./logger";

describe("Logger", () => {
  it("should output a message", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const logger = new Logger();
    const message = 'Hello, World 1';
    logger.log(LogLevel.WARN, message).out(OutType.LOG);

    expect(consoleSpy).toHaveBeenCalledWith(`[WARN] ${message}`);

    consoleSpy.mockRestore();
  });

  it("should output a message with timestamp", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const logger = new Logger();
    const message = 'Hello, World 2';
    const timestampPattern = /\[\d{4}\/\d{1,2}\/\d{1,2} \d{2}:\d{2}:\d{2} \(UTC[+-]\d{1,2}\)]/;
    logger.log(LogLevel.INFO, message).insertTimestamp().out(OutType.LOG);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(timestampPattern)); // タイムスタンプがパターンと一致するか
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`[INFO] ${message}`)); // メッセージが含まれているか

    consoleSpy.mockRestore();
  });

  it("test", () => {
// instantiation
    const logger = new Logger(); // Using 'let' is also OK

// Logging without timestamp
    logger.log(LogLevel.LOG, 'Hello World without timestamp').out(OutType.LOG);

// Logging with tampstamp
    logger.log(LogLevel.LOG, 'Hello World with timestamp').insertTimestamp().out(OutType.LOG);

// You can use different levels!
    logger.log(LogLevel.LOG, 'Hello World').out(OutType.LOG)
    logger.log(LogLevel.DEBUG, 'Hello World').out(OutType.DEBUG)
    logger.log(LogLevel.INFO, 'Hello World').out(OutType.INFO)
    logger.log(LogLevel.WARN, 'Hello World').out(OutType.WARN)
    logger.log(LogLevel.ERROR, 'Hello World').out(OutType.ERROR)
  });
});
