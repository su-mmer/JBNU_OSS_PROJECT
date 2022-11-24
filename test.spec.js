require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');

const fs = require('fs');

const channel = 'C04A2C19U31';

let token;

try {
  token = fs.readFileSync('./token').toString('utf-8');
} catch (err) {
  console.error(err);
}

const rtm = new RTMClient(token);

(async () => {
  await rtm.start().catch(console.error);
})();

const assert = require('assert');
const greeting = require('./greeting');
const square = require('./square');
const lunch = require('./lunch');

let res;

// 화살표 함수는 (arg)를 인자로 받아서 return 한다.
// 받는 인자 없이 res를 반환하는 형태가 됨.

// 함수 앞에 async를 붙이면 해당 함수는 프라미스를 반환한다.
// await은 async 안에서만 동작하며 await 키워드를 만나면 프라미스가 처리될 때까지 기다린다.
// 이 함수는 greeting이 끝날때까지 기다렸다가 res에 반환하는 형식
describe('테스트를 시작합니다.', async () => {
  before(async () => {
    res = await greeting(rtm, channel);
    return res;
  });

  it('인사 모듈 테스트', (done) => {
    console.log(res);
    assert.equal(res, 'success');
    done();
  });

  before(async () => {
    res = await square(rtm, channel);
    return res;
  });

  it('제곱 모듈 테스트', (done) => {
    console.log(res);
    assert.equal(res, 'success');
    done();
  });

  before(async () => {
    res = await lunch(rtm, channel);
    return res;
  });

  it('점심 메뉴 안내 및 평가 모듈 테스트', (done) => {
    console.log(res);
    assert.equal(res, 'success');
    done();
  });
});
