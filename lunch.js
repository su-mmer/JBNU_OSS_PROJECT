// 크롤링에 필요
const axios = require('axios');
const cheerio = require('cheerio');

const menuscorecalc = require('./menuscorecalc');

// 오늘 날짜 받아오기 위함
const todayDate = new Date();
// 오늘 요일 받아오기 위함
const todayDay = todayDate.getDay();

// 크롤링하는 함수
// url과 selector를 받아서 오늘 날짜에 맞는 메뉴를 배열 형태로 return
async function webScraping(url, selector) {
  const res = [];
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  const elements = $(selector);

  // elements에 selector의 값을 모두 저장하고 그 중 text만 res에 저장
  elements.each((i, el) => {
    res[i] = $(el).text();
  });

  // 오늘 요일을 받아 res에서 찾을 index
  const index = (todayDate.getDay() - 1) * 4;
  const todayMenu = [res[index], res[index + 1], res[index + 2], res[index + 3]];

  return todayMenu;
}

const url = 'https://sobi.chonbuk.ac.kr/menu/week_menu.php';
const selector = 'div.contentsArea.WeekMenu > div > div > table > tbody > tr > td > ul > li:has(span, font)';
// 점심 메뉴 평가의 기본 점수는 2점
let lunchScore;

// bot에 메세지 넘기는 함수
const lunch = async function (rtm, channel) {
  console.log('진수원 점심 메뉴 안내 및 평가 실시합니다');

  try {
    // 오늘의 요일이 일요일(0)과 토요일(6)이 아니라면 점심 메뉴 안내를 해줌
    // 토요일 또는 일요일이라면 '토요일과 일요일은 진수원 휴무입니다.'를 출력
    if (todayDay !== 0 && todayDay !== 6) {
      // 크롤링 결과 res로 받아와서 배열 내용 하나씩 출력
      // 점심 메뉴 안내 후 메뉴 평가 점수를 출력하기 위해 await 사용
      await webScraping(url, selector).then((res) => {
        rtm.sendMessage(`${res[0]}, ${res[1]}, ${res[2]}, ${res[3]}`, channel);
        lunchScore = menuscorecalc(res);
      });

      rtm.sendMessage(`오늘의 식단은 ${lunchScore}점`, channel);
    } else {
      rtm.sendMessage('토요일과 일요일은 진수원 휴무입니다.', channel);
    }
    return Promise.resolve('success');
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};
module.exports = lunch;
