import { createLogger, transports, format } from "winston";
const serverLogger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message }) => {
            return `${level}: ${message}`;
        })
    ),
});

export { serverLogger }
