const sendMessageArray = ['Hello', '안녕하세요', 'hola'];

const greeting = function (rtm, channel) {
  console.log('인사를 실시합니다');

  try {
    // 사용자가 'hi'를 입력할 때마다 0 ~ 2 중에서 랜덤으로 숫자를 골라 randomIndex에 저장한다.
    // 그 후, sendMessageArray의 randomIndex에 해당하는 인사 대답을 사용자에게 보낸다.
    const randomIndex = Math.floor(Math.random() * 3);
    rtm.sendMessage(sendMessageArray[randomIndex], channel);
    return Promise.resolve(sendMessageArray[randomIndex]);
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};
module.exports = greeting;
