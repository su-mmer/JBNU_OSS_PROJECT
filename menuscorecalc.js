// 진수원 중식 메뉴를 평가해주는 함수
const menuScoreCalc = function (menu) {
  // 평가의 기본 점수는 2점
  let score = 2;

  // 메뉴에 미나리, 나물, 쑥, 팥, 부추, 버섯, 샐러드가 있다면 -1점을,
  // 메뉴에 닭, 돈, 고기, 치킨, 치즈, 불고기가 있다면 +1점을 해줌
  // 또한 -1점 음식과 +1점 음식이 같이 있을 시(예)치킨샐러드), -1점 처리해주기 위해 -1점 메뉴를 먼저 검사하도록 설정
  for (let i = 0; i < 4; i += 1) {
    if (menu[i].match('미나리') || menu[i].match('나물') || menu[i].match('쑥') || menu[i].match('팥')
            || menu[i].match('부추') || menu[i].match('버섯') || menu[i].match('샐러드')) {
      score -= 1;
    } else if (menu[i].match('닭') || menu[i].match('돈') || menu[i].match('고기')
            || menu[i].match('치킨') || menu[i].match('치즈') || menu[i].match('불고기')) {
      score += 1;
    }
  }

  // 메뉴 평가를 통해 score 값이 1점 미만 또는 3점 초과가 될 수 있음
  // 1점 미만이라면 1점을, 3점 초과라면 3점을 부여
  if (score <= 1) {
    score = 1;
  } else if (score >= 3) {
    score = 3;
  }
  return score;
};
module.exports = menuScoreCalc;
