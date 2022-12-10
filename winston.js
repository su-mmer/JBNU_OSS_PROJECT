const winston = require('winston');
const WinstonDaily = require('winston-daily-rotate-file'); // 날짜별로 로그 파일 저장을 위해 필요

const logDir = 'logs'; // logs 파일 하위에 로그 파일들을 저장하기 위해 필요

const {
  combine, timestamp, printf,
} = winston.format;

// log 포맷 정의
// eslint-disable-next-line no-shadow
const logFormat = printf(({ level, message, timestamp }) => `[${timestamp}] [${level.toUpperCase()}]: ${message}`);

// 로그 레벨 => error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm',
    }),
    logFormat,
  ),
  transports: [
    // info 레벨 로그 저장을 위한 파일 설정
    new WinstonDaily({
      dirname: logDir,
      datePattern: 'YYYY.MM.DD', // 로그 파일 이름의 %DATE% 형식
      filename: '%DATE%_info.log',
      level: 'info',
      maxFiles: '30d', // 생성된 지 30일이 지난 로그 파일은 삭제
    }),

    // debug 레벨 로그 저장을 위한 파일 설정
    new WinstonDaily({
      dirname: logDir,
      datePattern: 'YYYY.MM.DD',
      filename: '%DATE%_debug.log',
      level: 'debug',
      maxFiles: '30d',
    }),
  ],
});
module.exports = logger;
