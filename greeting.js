const logger = require('./winston');

const sendMessageArray = ['Hello', '안녕하세요', 'hola'];

const greeting = function (rtm, channel) {
  console.log('인사를 실시합니다');
  logger.info('greeting.js__ 인사 실시');

  try {
    // 사용자가 'hi'를 입력할 때마다 0 ~ 2 중에서 랜덤으로 숫자를 골라 randomIndex에 저장한다.
    // 그 후, sendMessageArray의 randomIndex에 해당하는 인사 대답을 사용자에게 보낸다.
    const randomIndex = Math.floor(Math.random() * 3);
    rtm.sendMessage(sendMessageArray[randomIndex], channel);
    logger.info(`봇 메시지: ${sendMessageArray[randomIndex]}`);
    return Promise.resolve('success');
  } catch (error) {
    console.log('error!', error.data);
    logger.debug('greeting.js__ 인사 오류');
    return Promise.resolve('error');
  }
};
module.exports = greeting;
