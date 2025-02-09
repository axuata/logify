// Copyright (c) 2025 Axuata.
// This code is licensed under the MIT License.
// https://opensource.org/licenses/MIT

import {describe, expect, it, vi} from "vitest";
import {Logger, LogLevel, OutType} from "./logger";

describe("Logger", () => {
  it("should output a message without timestamp", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const logger = new Logger();
    const message = 'Hello, World 1';
    logger.log(LogLevel.LOG, message).out(OutType.LOG);

    expect(consoleSpy).toHaveBeenCalledWith(`[LOG] ${message}`);

    consoleSpy.mockRestore();
  });

  it("should output a message with timestamp", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const logger = new Logger();
    const message = 'Hello, World 2';
    const timestampPattern = /\[\d{4}\/\d{1,2}\/\d{1,2} \d{1,2}:\d{2}:\d{2} \(UTC[+-]?\d{1,2}\)]/;
    logger.log(LogLevel.LOG, message).insertTimestamp().out(OutType.LOG);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(timestampPattern));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`[LOG] ${message}`));

    consoleSpy.mockRestore();
  });

  it("should output a message with a custom timestamp", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const logger = new Logger();
    const message = 'Hello, World 3';
    logger.log(LogLevel.LOG, message).insertCustomTimestamp('YYYY/MM/DD HH:mm:ss Z').out(OutType.LOG);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`2025`));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`(UTC`));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`[LOG]`));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`${message}`));

    consoleSpy.mockRestore();
  })

  it("should output a message with a custom prefix", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const logger = new Logger();
    const message = 'Hello, World 4';
    logger.log(LogLevel.LOG, message).insertCustomPrefix('⚡').out(OutType.LOG);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`⚡ [LOG] ${message}`));
  });
});
