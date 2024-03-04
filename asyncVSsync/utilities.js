const winston = require('winston')
const logger = winston.createLogger({
    level: 'info',
    transports: [new winston.transports.Console()]
})

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { getRndInteger, logger };
