const logger = require('./winston');

const square = function (rtm, text, channel) {
  console.log('제곱을 실시합니다');
  logger.info('square.js__ 제곱 실시');

  try {
    rtm.sendMessage(`The result is ${text * text}`, channel);
    return Promise.resolve('success');
  } catch (error) {
    console.log('error!', error.data);
    logger.info('square.js__ 제곱 오류');
    return Promise.resolve('error');
  }
};

module.exports = square;
