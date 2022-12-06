const fs = require('fs');

let dept;
let splitDeptText;

try {
  // dept.txt를 한 줄 씩 읽어옴
  dept = fs.readFileSync('dept.txt').toString('utf-8').split('\n');
} catch (err) {
  console.error(err);
}

const department = function (rtm, text, channel) {
  console.log('학과 사무실 안내를 실시합니다');

  switch (text) {
    case 'Architectural Engineering':
      // '-'을 기준으로 문장을 자름
      splitDeptText = dept[0].split('-');
      rtm.sendMessage(splitDeptText[1], channel);
      break;
    case 'Mechanical Engineering':
      splitDeptText = dept[1].split('-');
      rtm.sendMessage(splitDeptText[1], channel);
      break;
    case 'Urban Engineering':
      splitDeptText = dept[2].split('-');
      rtm.sendMessage(splitDeptText[1], channel);
      break;
    case 'Electronic Engineering':
      splitDeptText = dept[3].split('-');
      rtm.sendMessage(splitDeptText[1], channel);
      break;
    case 'Computer Science and Engineering':
      splitDeptText = dept[4].split('-');
      rtm.sendMessage(splitDeptText[1], channel);
      break;
    case 'Chemical Engineering':
      splitDeptText = dept[5].split('-');
      rtm.sendMessage(splitDeptText[1], channel);
      break;
    case 'Accounting':
      splitDeptText = dept[6].split('-');
      rtm.sendMessage(splitDeptText[1], channel);
      break;
    case 'International Trade':
      splitDeptText = dept[7].split('-');
      rtm.sendMessage(splitDeptText[1], channel);
      break;
    case 'Korean Language and Literature':
      splitDeptText = dept[8].split('-');
      rtm.sendMessage(splitDeptText[1], channel);
      break;
    case 'Library and Information Science':
      splitDeptText = dept[9].split('-');
      rtm.sendMessage(splitDeptText[1], channel);
      break;
    default:
      rtm.sendMessage('해당 학과는 안내 불가 합니다.', channel);
  }
};
module.exports = department;
