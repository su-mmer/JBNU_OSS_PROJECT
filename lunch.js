// 크롤링에 필요
const axios = require('axios');
const cheerio = require('cheerio');
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

  elements.each((i, el) => {
    res[i] = $(el).text();
  });

  const menu = [[res[9], res[10], res[11], res[12]],
    [res[19], res[20], res[21], res[22]],
    [res[39], res[40], res[41], res[42]],
    [res[62], res[63], res[64], res[65]],
    [res[81], res[82], res[83], res[84]]];

  return menu[todayDate.getDay() - 1];
}

const url = 'https://sobi.chonbuk.ac.kr/menu/week_menu.php';
const selector = 'div.contentsArea.WeekMenu > div:nth-child(219) > div:nth-child(2) > table > tbody > tr > td > ul > li';
// 점심 메뉴 평가의 기본 점수는 2점
let lunchScore = 2;

// bot에 메세지 넘기는 함수
const lunch = async function (rtm, channel) {
  console.log('진수원 점심 메뉴 안내 및 평가');

  try {
    // 오늘의 요일이 일요일(0)과 토요일(6)이 아니라면 점심 메뉴 안내를 해줌
    // 토요일 또는 일요일이라면 '토요일과 일요일은 진수원 휴무입니다.'를 출력
    if (todayDay !== 0 && todayDay !== 6) {
      // 크롤링 결과 res로 받아와서 배열 내용 하나씩 출력
      // 점심 메뉴 안내 후 메뉴 평가 점수를 출력하기 위해 await 사용
      // TODO 리팩토링
      await webScraping(url, selector).then((res) => {
        rtm.sendMessage(`${res[0]}, ${res[1]}, ${res[2]}, ${res[3]}`, channel);

        // 메뉴에 미나리, 나물, 부추, 버섯, 샐러드가 있다면 -1점을,
        // 메뉴에 닭, 돈, 치킨, 치즈, 불고기가 있다면 +1점을 해줌
        // 또한 -1점 음식과 +1점 음식이 같이 있을 시(예)치킨샐러드), -1점 처리해주기 위해 -1점 메뉴를 먼저 검사하도록 설정
        for (let i = 0; i < 4; i += 1) {
          if (res[i].match('미나리') || res[i].match('나물')
            || res[i].match('부추') || res[i].match('버섯') || res[i].match('샐러드')) {
            lunchScore -= 1;
          } else if (res[i].match('닭') || res[i].match('돈')
            || res[i].match('치킨') || res[i].match('치즈') || res[i].match('불고기')) {
            lunchScore += 1;
          }
        }
      });

      // 메뉴 평가를 통해 lunchScore 값이 1점 미만 또는 3점 초과가 될 수 있음
      // 1점 미만이라면 1점을, 3점 초과라면 3점을 부여
      if (lunchScore <= 1) {
        rtm.sendMessage('오늘의 식단은 1점', channel);
      } else if (lunchScore >= 3) {
        rtm.sendMessage('오늘의 식단은 3점', channel);
      } else {
        rtm.sendMessage(`오늘의 식단은 ${lunchScore}점`, channel);
      }
    } else {
      rtm.sendMessage('토요일과 일요일은 진수원 휴무입니다.', channel);
    }
    return Promise.resolve('success');
  } catch (error) {
    return Promise.resolve('error');
  }
};
module.exports = lunch;
