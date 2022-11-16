// 크롤링에 필요
const axios = require('axios');
const cheerio = require('cheerio');
// 오늘 날짜 받아오기 위함
const today = new Date();

// 크롤링하는 함수
// url과 selector를 받아서 오늘 날짜에 맞는 메뉴를 배열 형태로 return
async function webScraping(url, selector) {
  const res = [];
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  const elements = $(selector);

  elements.each((i, el) => {
    res[i] = $(el).text();
  });

  const menu = [[res[9], res[10], res[11], res[12]],
    [res[19], res[20], res[21], res[22]],
    [res[39], res[40], res[41], res[42]],
    [res[62], res[63], res[64], res[65]],
    [res[81], res[82], res[83], res[84]]];

  return menu[today.getDay() - 1];
}

const url = 'https://sobi.chonbuk.ac.kr/menu/week_menu.php';
const selector = 'div.contentsArea.WeekMenu > div:nth-child(219) > div:nth-child(2) > table > tbody > tr > td > ul > li';

// bot에 메세지 넘기는 함수
const lunch = function (rtm, channel) {
  console.log('진수원 점심 메뉴 안내 및 평가');

  try {
    // 크롤링 결과 res로 받아와서 배열 내용 하나씩 출력
    // TODO 리팩토링
    webScraping(url, selector).then((res) => {
      rtm.sendMessage(`${res[0]}, ${res[1]}, ${res[2]}, ${res[3]}`, channel);
    });
    return Promise.resolve('success');
  } catch (error) {
    return Promise.resolve('error');
  }
};
module.exports = lunch;
