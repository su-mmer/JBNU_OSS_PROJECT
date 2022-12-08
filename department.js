const { spawn } = require('child_process'); // js에서 파이썬을 실행시키기 위함

const department = function (rtm, text, channel) {
  console.log('학과 사무실 안내를 실시합니다');

  // 'python ./findDepartment.py text'를 실행시켜 inputText에 저장
  const inputText = spawn('python', ['./findDepartment.py', text.trim()]);
  // 결과값 result를 봇에게 전달
  inputText.stdout.on('data', (result) => {
    rtm.sendMessage(result.toString(), channel);
  });
};
module.exports = department;
