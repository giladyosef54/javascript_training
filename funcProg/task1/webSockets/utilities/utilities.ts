import { createLogger, transports, format } from "winston";


const logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
});


function getRndInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  


export { logger, getRndInt }