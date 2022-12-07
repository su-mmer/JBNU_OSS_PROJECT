// 크롤링에 필요
const axios = require('axios');
const cheerio = require('cheerio');

const menuscorecalc = require('./menuscorecalc');

// 이번주 메뉴 담을 배열
const MonMenu = new Array(4);
const TueMenu = new Array(4);
const WedMenu = new Array(4);
const ThuMenu = new Array(4);
const FriMenu = new Array(4);

// 크롤링하는 함수
// url과 selector를 받아서 오늘 날짜에 맞는 메뉴를 배열 형태로 return
const WebScraping = async function (url, selector) {
  const res = [];
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  const elements = $(selector);

  // elements에 selector의 값을 모두 저장하고 그 중 text만 res에 저장
  elements.each((i, el) => {
    res[i] = $(el).text();
  });

  // 오늘 요일을 받아 res에서 찾을 index
  for (let i = 0; i < 4; i += 1) {
    MonMenu[i] = res[i];
  }
  for (let i = 4; i < 8; i += 1) {
    TueMenu[i - 4] = res[i];
  }
  for (let i = 8; i < 12; i += 1) {
    WedMenu[i - 8] = res[i];
  }
  for (let i = 12; i < 16; i += 1) {
    ThuMenu[i - 12] = res[i];
  }
  for (let i = 16; i < 20; i += 1) {
    FriMenu[i - 16] = res[i];
  }

  console.log(MonMenu);
  console.log(TueMenu);
  console.log(WedMenu);
  console.log(ThuMenu);
  console.log(FriMenu);

  return [MonMenu, TueMenu, WedMenu, ThuMenu, FriMenu];
};

const url = 'https://sobi.chonbuk.ac.kr/menu/week_menu.php';
const selector = 'div.contentsArea.WeekMenu > div > div > table > tbody > tr > td > ul > li:has(span, font)';

// menuscore()을 통해 계산 된 각 요일의 평가 점수를 차례대로 배열에 저장하기 위해 필요
// index 0부터 차례대로 월, 화, 수, 목, 금요일의 점수가 저장됨
const weekLunchScore = new Array(5);

// bot에 메세지 넘기는 함수
const weeklunch = async function (rtm, channel) {
  console.log('이번주 진수원 점심 메뉴 평가를 실시합니다');

  try {
    await WebScraping(url, selector).then((res) => {
      // menuscorecalc()를 이용해 월요일부터 차례대로 점심 메뉴 평가 후, weekLunchScore에 저장
      for (let i = 0; i < 5; i += 1) {
        weekLunchScore[i] = menuscorecalc(res[i]);
      }
    });

    rtm.sendMessage(`월요일 - ${weekLunchScore[0]}점`, channel);
    rtm.sendMessage(`화요일 - ${weekLunchScore[1]}점`, channel);
    rtm.sendMessage(`수요일 - ${weekLunchScore[2]}점`, channel);
    rtm.sendMessage(`목요일 - ${weekLunchScore[3]}점`, channel);
    rtm.sendMessage(`금요일 - ${weekLunchScore[4]}점`, channel);

    return Promise.resolve('success');
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};
module.exports = weeklunch;
