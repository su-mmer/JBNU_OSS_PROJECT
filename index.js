require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');

let token;
// const fs = require('fs');

try {
  // token = fs.readFileSync('./token', 'utf-8');
  token = process.env.TOKEN;
} catch (err) {
  console.error(err);
}

const rtm = new RTMClient(token);
rtm.start();

const greeting = require('./greeting');
const square = require('./square');
const lunch = require('./lunch');

rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;

  // !isNaN(text) -> !Number.isNaN(Number(text))
  if (!Number.isNaN(Number(text))) {
    square(rtm, text, channel);
  } else {
    switch (text) {
      case 'hi':
        greeting(rtm, channel);
        break;
      case '오늘 점심 뭐야':
        lunch(rtm, channel);
        break;
      default:
        rtm.sendMessage('I`m alive', channel);
    }
  }
});
