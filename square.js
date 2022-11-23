const square = function (rtm, text, channel) {
  console.log('제곱을 실시합니다');

  try {
    rtm.sendMessage(`The result is ${text * text}`, channel);
    return Promise.resolve('success');
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};

module.exports = square;
