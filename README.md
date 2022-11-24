# J Slack-bot

<img src="https://img.shields.io/badge/javascript-F7DF1E?style=flat&logo=javascript&logoColor=black"> <img  src="https://img.shields.io/badge/node.js-339933?style=flat&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/Slack-4A154B?style=flat&logo=Slack"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub"/> ![GitHub top language](https://img.shields.io/github/languages/top/su-mmer/JBNU_OSS_PROJECT) 

<img src="https://www.jbnu.ac.kr/kor/images/227_10.jpg" width="100" height="100"/> <img  src="https://previews.us-east-1.widencdn.net/preview/48045879/assets/asset-view/9338f8ce-2eed-41d7-b222-350e8ea9f361/thumbnail/eyJ3IjoyMDQ4LCJoIjoyMDQ4LCJzY29wZSI6ImFwcCJ9?Expires=1669309200&Signature=QSbrsA9kXKP86G5FHjMrlOfFa4abIpjqQlR5ig75TOobrP0DKvCDZ57Za5g0BrkmOKTEYi-31pnf1-RYm37P87n5PTrEnH7lisCgr29b0dEFrSb0b2dWO3WS7iFUnLjuMmUt8NbCDykTV7BZi-hsSwuUd0w7PNHvFVKtPwWQydN4oEy7tUS~X5yfxQ0l7URXSpQHaC7PDt8AAxZ2D7kfQ5TyUmzs2A1Zw9Yj8qssVo3hmAL4Eof3WW5MQr737zU5bAdjlb8J1Mo1TvItKXjMtozsjNYfGeSmlowYFAhoQg3AY~Bu9h-mwl7AX7SLvTHI77O-z9d3TXq-o4aUxVu~YQ__&Key-Pair-Id=APKAJM7FVRD2EPOYUXBQ" width="100" height="100"/> 

<br>

---
<br>

## What is Slack-bot?
슬랙봇은 슬랙에서 사용할 수 있는 챗봇입니다. 사용자의 입력에 따라 정해진 대답을 합니다.
<br>

### 슬랙봇 살아있니?
슬랙에게 아무말이나 걸어보세요. 슬랙은 항상 `I'm alive.`라고 대답해 자신이 동작 중임을 알려줄거에요.

![image](https://user-images.githubusercontent.com/50980974/203709815-b1d0d1e3-e165-40ec-8fee-ec293493e29c.png)


### 인사
슬랙봇에게 인사를 해보세요.
사용자가 `hi`를 입력하면 슬랙봇이 3가지 랜덤한 대답 중 하나로 반겨줄거에요.

![image](https://user-images.githubusercontent.com/50980974/203709761-a85a1bd6-2459-42ec-a4ee-e476f8d72512.png)


### 오늘 점심 뭐야?
진수당의 오늘 점심 메뉴가 궁금하신가요? 홈페이지까지 들어가 찾아보지 않아도 됩니다. 슬랙봇에게 `오늘 점심 뭐야`라고 물으면 오늘의 점심과  별점까지 알려줍니다.
별점은 정해진 고기 메뉴가 나오면 +1, 야채 메뉴가 나오면 -1로 설정 되어 있습니다. 1~3점 이내의 점수로 알려드릴게요.

![image](https://user-images.githubusercontent.com/50980974/203709794-4c61abeb-f360-49e8-b426-4637654e4b92.png)


### 숫자 제곱
슬랙봇에게 숫자를 알려주면 슬랙봇이 제곱수로 대답해줄거에요.

![image](https://user-images.githubusercontent.com/50980974/203709850-9e92c7fa-6552-42f0-9cab-0dd585a100f5.png)


<br>

## To start using Slack-bot
1. git clone 또는 zip파일을 다운 받아 압축해제하고 IDE로 파일을 열어주세요.
	``` bash
	$ git clone https://github.com/su-mmer/JBNU_OSS_PROJECT.git
	```
2. npm dependency를 다운받습니다.
	``` bash
	$ npm install
	```
3. 사용할 슬랙봇의 토큰번호를 받아옵니다. 슬랙 > 봇 정보에서 `xoxb`로 시작하는 토큰 번호를 확인 할 수 있습니다.

5. 최상위루트에 `token`파일을 생성합니다.
	```bash
	$ echo <토큰번호> > ./token
	```
	이 때, 토큰 파일을 확인하여 개행이 없도록 해야합니다. 토큰 파일에는 오로지 토큰 번호만 있어야합니다.
	
6. 봇을 실행시켜주세요.
	``` bash
	$ npm start
	```
7. 이제 슬랙봇이 대답 할 수 있습니다. 종료시 `Ctrl+C` 로 서버를 종료할 수 있습니다.

<br>

## To start developing Slack-bot
1. GitHub에 New Issue를 등록해주세요. 양식은 Issue 생성 시에 선택하실 수 있습니다.

2. 상단 Fork를 눌러 이 Repository를 본인 계정으로 Fork 합니다.

3. \<To start using Slack-bot>단계를 진행해주세요. 이 때 fork한 본인의 Repository를 clone해야합니다.

4. 본인이 등록한 Issue 번호와 \<브랜치 타입>에 맞춰 브랜치를 생성합니다. Issue 한 개 당 브랜치는 하나만 생성해주세요.
	``` bash
	$ git switch -c <branch_type>/<issue_number>
	```
5. 본인이 등록한 Issue대로 코드를 수정합니다.

6. 완료 후 \<커밋 형식>에 맞게 커밋합니다. 커밋 시 `git commit`을 입력하여 커밋 규칙에 맞게 생성되는지 확인해주세요. 자동으로 `<branch_name>(#issue_number):`가 생성됩니다. 

   ![image](https://user-images.githubusercontent.com/50980974/203710119-6a1dba79-51e7-4752-bc94-fbac6b592480.png)

   - 패키지에 esLint가 자동 적용되어 있습니다. 자동으로 esLint 검사를 하고 룰에 맞지 않으면 에러가 발생하니 조심하세요!

7. `git push`후에 GitHub에서 PR을 열어주세요. PR 템플릿에 맞게 작성해주시면 됩니다. 특별한 일이 없다면 `dev`브랜치로 merge PR 진행해주세요.
8. PR에 리뷰어를 최소 1명 이상 선택해주시고 이슈번호를 달아주세요.

<br>

### 브랜치 타입
- feature : 새로운 기능 추가
- hotfix : 버그 수정
- docs : 문서 수정
- test : 테스트 코드 추가
- refactor : 코드 리팩토링
- style : 코드 포맷팅, 코드 변경이 없는 경우
- chore : 빌드 업무 수정, 패키지 매니저 수정

<br>

### 커밋 형식
```
\<branch_type>(#이슈번호) : \<Title>

\<Body>
```
- 커밋 형식이 맞지 않으면 PR 반려 대상입니다.
- 제목 최대 영어-50글자, 한글-30글자이내로 작성해주세요.
- 관련 이슈번호 없을 경우 생략 가능합니다.
- 제목 끝에 마침표 생략해주세요.
- Body는 선택 사항이며 추가 설명이 필요할 때 자세히 적어주세요.

<br>

## Contributors
[qivvon](https://github.com/qivvon), [su-mmer](https://github.com/su-mmer)
