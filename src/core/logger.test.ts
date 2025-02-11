// Copyright (c) 2025 Axuata.
// This code is licensed under the MIT License.
// https://opensource.org/licenses/MIT

import {describe, expect, it, vi} from "vitest";
import {InsertPosition, Logger, LogLevel, OutType} from "./logger";

describe("Logger", () => {
  it("should output a message without timestamp", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const logger = new Logger();
    const message = 'Hello, World 1';
    logger.log(LogLevel.LOG, message).out(OutType.LOG);

    expect(consoleSpy).toHaveBeenCalledWith(`[LOG] ${message}`);

    consoleSpy.mockRestore();
  });

  it("should output a message with timestamp placed before the main message", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const logger = new Logger();
    const message = 'Hello, World 2';
    const timestampPattern = /\[\d{4}\/\d{1,2}\/\d{1,2} \d{1,2}:\d{2}:\d{2} \(UTC[+-]?\d{1,2}\)]/;
    logger.log(LogLevel.LOG, message).insertTimestamp(InsertPosition.BEFORE).out(OutType.LOG);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(timestampPattern));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`[LOG] ${message}`));

    consoleSpy.mockRestore();
  });

  it("should output a message with a custom timestamp placed before the main message", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const logger = new Logger();
    const message = 'Hello, World 3';
    logger.log(LogLevel.LOG, message).insertCustomTimestamp('YYYY/MM/DD HH:mm:ss Z', InsertPosition.BEFORE).out(OutType.LOG);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`2025`));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`(UTC`));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`[LOG]`));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`${message}`));

    consoleSpy.mockRestore();
  })

  it("should output a message with a custom prefix placed before the main message", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const logger = new Logger();
    const message = 'Hello, World 4';
    logger.log(LogLevel.LOG, message).insertCustomPrefix('⚡', InsertPosition.BEFORE).out(OutType.LOG);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`⚡ [LOG] ${message}`));
  });

  it("should output a message with timestamp placed after the main message", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const logger = new Logger();
    const message = 'Hello, World 5';
    const timestampPattern = /\[\d{4}\/\d{1,2}\/\d{1,2} \d{1,2}:\d{2}:\d{2} \(UTC[+-]?\d{1,2}\)]/;
    logger.log(LogLevel.LOG, message).insertTimestamp(InsertPosition.AFTER).out(OutType.LOG);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(timestampPattern));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`[LOG] ${message} [`));

    consoleSpy.mockRestore();
  });

  it("should output a message with a custom timestamp placed after the main message", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const logger = new Logger();
    const message = 'Hello, World 6';
    logger.log(LogLevel.LOG, message).insertCustomTimestamp('YYYY/MM/DD HH:mm:ss Z', InsertPosition.AFTER).out(OutType.LOG);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`${message} [2025`));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`(UTC`));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`[LOG]`));

    consoleSpy.mockRestore();
  });

  it("should output a message with a custom prefix placed after the main message", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const logger = new Logger();
    const message = 'Hello, World 7';
    logger.log(LogLevel.LOG, message).insertCustomPrefix('⚡', InsertPosition.AFTER).out(OutType.LOG);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`[LOG] ${message} ⚡`));
  });

  it("should start a log group with the given label", () => {
    const consoleGroupSpy = vi.spyOn(console, "group").mockImplementation(() => {});

    const logger = new Logger();
    const groupLabel = "Hello, World 8";
    logger.startGroup(groupLabel);

    expect(consoleGroupSpy).toHaveBeenCalledWith(groupLabel);

    consoleGroupSpy.mockRestore();
  });

  it("should end a log group", () => {
    const consoleGroupEndSpy = vi.spyOn(console, "groupEnd").mockImplementation(() => {});

    const logger = new Logger();
    logger.endGroup();

    expect(consoleGroupEndSpy).toHaveBeenCalled();

    consoleGroupEndSpy.mockRestore();
  });
});
