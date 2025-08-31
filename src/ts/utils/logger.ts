import { MODULE_ID } from "../constants.ts";

type LogLevel = "debug" | "info" | "warn" | "error";

class Logger {
    #prefix: string;
    #level: LogLevel;

    constructor(prefix = MODULE_ID, level: LogLevel = "info") {
        this.#prefix = prefix;
        this.#level = level;
    }

    set level(level: LogLevel) {
        this.#level = level;
    }

    debug(...args: unknown[]): void {
        if (this.#level === "debug") {
            console.debug(`[${this.#prefix}]`, ...args);
        }
    }

    info(...args: unknown[]): void {
        console.info(`[${this.#prefix}]`, ...args);
    }

    warn(...args: unknown[]): void {
        console.warn(`[${this.#prefix}]`, ...args);
    }

    error(...args: unknown[]): void {
        console.error(`[${this.#prefix}]`, ...args);
    }
}

const logger = new Logger();

export { Logger, logger };
