
export enum LoggerLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3
}


export interface ILogger {
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(error: Error): void;
    error(message: string): void;
}


export class LoggerFactory {

    public static minLevel: LoggerLevel = __DEV__ ? LoggerLevel.DEBUG : LoggerLevel.INFO;

    public static createLogger(scope: string): Logger {
        return new Logger(scope, LoggerFactory.minLevel);
    }
}



class Logger implements ILogger {

    constructor(public scope: string, public minLevel: LoggerLevel) { }

    public log(level: LoggerLevel, message: string) {

        if (level < this.minLevel) return;

        const levelText = LoggerLevel[level];

        console.log(`${new Date().toISOString()} [${levelText}] ${this.scope}: ${message}`);
    }

    public debug(message: string) {
        this.log(LoggerLevel.DEBUG, message);
    }

    public info(message: string) {
        this.log(LoggerLevel.INFO, message);
    }

    public warn(message: string) {
        this.log(LoggerLevel.WARN, message);
    }

    public error(error: Error): void;
    public error(message: string): void;
    public error(messageOrError: string | Error) {

        if (messageOrError instanceof Error) {

            const message = `${messageOrError.message}\n${messageOrError.stack}`;
            this.log(LoggerLevel.ERROR, message);
        }
        else
            this.log(LoggerLevel.ERROR, messageOrError);
    }
}