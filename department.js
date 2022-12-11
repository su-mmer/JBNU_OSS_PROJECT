const { spawn } = require('child_process'); // js에서 파이썬을 실행시키기 위함

const logger = require('./winston');

const department = function (rtm, text, channel) {
  console.log('학과 사무실 안내를 실시합니다');
  logger.info('department.js__ 학과 사무실 안내 실시');

  try {
    // 'python ./findDepartment.py text'를 실행시켜 inputText에 저장
    const inputText = spawn('python', ['./findDepartment.py', text.trim()]);
    // 결과값 result를 봇에게 전달
    inputText.stdout.on('data', (data) => {
      console.log(data.toString());
      rtm.sendMessage(data.toString(), channel);
      logger.info(`봇 메시지: ${data.toString()}`);
    });
    return Promise.resolve('success');
  } catch (error) {
    console.log('error!', error.data);
    logger.debug('debug', 'department.js__ 학과 사무실 안내 오류');
    return Promise.resolve('error');
  }
};
module.exports = department;
