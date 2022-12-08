require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');

const fs = require('fs');

const channel = 'C04A2C19U31';

let token;

try {
  token = fs.readFileSync('./token').toString('utf-8');
  token = token.trim();
} catch (err) {
  console.error(err);
}

const rtm = new RTMClient(token);

(async () => {
  await rtm.start().catch(console.error);
})();

const greeting = require('../greeting');

let res;

describe('인사 테스트를 시작합니다', async () => {
  before(async () => {
    res = await greeting(rtm, channel);
    return res;
  });
  it('인사 모듈 테스트', (done) => {
    console.log(res);
    if (res === 'Hello' || res === '안녕하세요' || res === 'hola') {
      done();
    }
  });
});
