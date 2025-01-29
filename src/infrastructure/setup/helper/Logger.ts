import winston, { type Logger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

function createLogger(): Logger {
    return winston.createLogger({
        level: "info",
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.timestamp(),
                    winston.format.simple(),
                ),
            }),
            new DailyRotateFile({
                filename: "logs/app-%DATE%.log",
                datePattern: "YYYY-MM-DD",
                maxSize: "5m", // Limit the file size to 5MB
                maxFiles: "14d",
                level: "info",
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json(),
                ),
            }),
        ],
    });
}

const logger = createLogger();

export default logger;
