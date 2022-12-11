const { RTMClient } = require('@slack/rtm-api');

let token;
const fs = require('fs');

try {
  token = fs.readFileSync('./token', 'utf-8');
  token = token.trim();
} catch (err) {
  console.error(err);
}

const rtm = new RTMClient(token);
rtm.start();

const greeting = require('./greeting');
const square = require('./square');
const lunch = require('./lunch');
const weeklunch = require('./weeklunch');
const department = require('./department');

// 사용자가 '학과 안내'를 입력하였을 시, 값을 true로 바꿈
// 값이 true가 되면, '학과 안내' 입력 후에 사용자가 새로 입력한 메시지를 토대로 학과 안내를 시작함
let deptCheck = false;

rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;

  // !isNaN(text) -> !Number.isNaN(Number(text))
  if (!Number.isNaN(Number(text))) {
    square(rtm, text, channel);
  } else if (deptCheck === true) {
    department(rtm, text, channel);
    deptCheck = false;
  } else {
    switch (text) {
      case 'hi':
        greeting(rtm, channel);
        break;
      case '오늘 점심 뭐야':
        lunch(rtm, channel);
        break;
      case '이번주 뭐 나와':
        weeklunch(rtm, channel);
        break;
      case '학과 사무실 안내':
        rtm.sendMessage('학과를 입력해주세요', channel);
        deptCheck = true;
        break;
      default:
        rtm.sendMessage('I`m alive', channel);
    }
  }
});
