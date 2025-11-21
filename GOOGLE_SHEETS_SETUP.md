# 📊 Google Sheets 연동 설정 가이드

## 🎯 개요
솔라코어 랜딩 페이지의 상담 신청 폼과 사진 업로드를 Google Sheets에 자동으로 저장하고, 이메일 알림을 받을 수 있습니다.

---

## 📋 STEP 1: Google Sheets 생성

### 1-1. 새 스프레드시트 만들기
1. https://sheets.google.com 접속
2. **+ 새로 만들기** 클릭
3. 스프레드시트 이름: **"솔라코어 상담 신청 데이터"**

### 1-2. 시트 1 - 상담 신청 (기본 시트 이름 변경)
하단 시트 탭에서 "Sheet1" 우클릭 → 이름 바꾸기 → **"상담신청"**

**첫 번째 행(헤더)에 입력**:
```
A1: 이름
B1: 연락처
C1: 건물유형
D1: 면적(평)
E1: 월전기요금(만원)
F1: 문의내용
G1: 제출시간
```

### 1-3. 시트 2 - 사진 업로드 추가
1. 하단 **+ 버튼** 클릭 (새 시트 추가)
2. 시트 이름: **"사진업로드"**

**첫 번째 행(헤더)에 입력**:
```
A1: 연락처
B1: 파일이름
C1: 파일크기(MB)
D1: 제출시간
```

---

## ⚙️ STEP 2: Apps Script 설정

### 2-1. Apps Script 에디터 열기
1. 스프레드시트 상단 메뉴: **확장 프로그램** → **Apps Script**
2. 새 탭에서 Apps Script 에디터 열림
3. 기본 코드 전체 삭제

### 2-2. 코드 붙여넣기
아래 코드를 **전체 복사하여 붙여넣기**:

```javascript
// ========================================
// 솔라코어 - Google Sheets 자동화 스크립트
// ========================================

// 📧 이메일 수신 주소 설정
var ADMIN_EMAIL = "jimy9902@naver.com";

// 📊 시트 이름 설정
var SHEET_NAME_CONTACT = "상담신청";
var SHEET_NAME_PHOTO = "사진업로드";

// ========================================
// 메인 처리 함수
// ========================================
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);
    
    // 폼 타입에 따라 분기 처리
    if (data.formType === 'contact') {
      return handleContactForm(sheet, data);
    } else if (data.formType === 'photo') {
      return handlePhotoForm(sheet, data);
    }
    
    return createResponse('error', '알 수 없는 요청입니다.');
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return createResponse('error', error.toString());
  }
}

// ========================================
// 상담 신청 폼 처리
// ========================================
function handleContactForm(spreadsheet, data) {
  var sheet = spreadsheet.getSheetByName(SHEET_NAME_CONTACT);
  
  // 시트가 없으면 생성
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME_CONTACT);
    sheet.appendRow(['이름', '연락처', '건물유형', '면적(평)', '월전기요금(만원)', '문의내용', '제출시간']);
  }
  
  // 데이터 추가
  var timestamp = new Date();
  sheet.appendRow([
    data.name || '',
    data.phone || '',
    data.buildingType || '',
    data.area || '',
    data.electricBill || '',
    data.message || '',
    Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss')
  ]);
  
  // 이메일 발송
  sendContactEmail(data, timestamp);
  
  return createResponse('success', '상담 신청이 접수되었습니다.');
}

// ========================================
// 사진 업로드 폼 처리
// ========================================
function handlePhotoForm(spreadsheet, data) {
  var sheet = spreadsheet.getSheetByName(SHEET_NAME_PHOTO);
  
  // 시트가 없으면 생성
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME_PHOTO);
    sheet.appendRow(['연락처', '파일이름', '파일크기(MB)', '제출시간']);
  }
  
  // 데이터 추가
  var timestamp = new Date();
  var fileSizeMB = data.fileSize ? (data.fileSize / 1024 / 1024).toFixed(2) : '0';
  
  sheet.appendRow([
    data.phone || '',
    data.fileName || '',
    fileSizeMB,
    Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss')
  ]);
  
  // 이메일 발송
  sendPhotoEmail(data, timestamp);
  
  return createResponse('success', '사진 업로드가 완료되었습니다.');
}

// ========================================
// 상담 신청 이메일 발송
// ========================================
function sendContactEmail(data, timestamp) {
  var subject = "🌞 [솔라코어] 새로운 상담 신청 - " + (data.name || '이름없음');
  
  var body = "솔라코어 홈페이지에서 새로운 상담 신청이 접수되었습니다.\n\n";
  body += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  body += "📋 상담 신청 정보\n";
  body += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
  body += "👤 이름: " + (data.name || '-') + "\n";
  body += "📞 연락처: " + (data.phone || '-') + "\n";
  body += "🏢 건물 유형: " + (data.buildingType || '-') + "\n";
  body += "📐 건물 면적: " + (data.area ? data.area + '평' : '-') + "\n";
  body += "⚡ 월 평균 전기요금: " + (data.electricBill ? data.electricBill + '만원' : '-') + "\n";
  body += "💬 문의 내용:\n" + (data.message || '-') + "\n\n";
  body += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  body += "⏰ 제출 시간: " + Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy년 MM월 dd일 HH:mm:ss') + "\n";
  body += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
  body += "📊 Google Sheets에서 확인하기:\n";
  body += SpreadsheetApp.getActiveSpreadsheet().getUrl() + "\n\n";
  body += "※ 24시간 내 연락 부탁드립니다.";
  
  try {
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: body
    });
  } catch (error) {
    Logger.log('Email Error: ' + error.toString());
  }
}

// ========================================
// 사진 업로드 이메일 발송
// ========================================
function sendPhotoEmail(data, timestamp) {
  var subject = "📸 [솔라코어] 새로운 사진 업로드 - " + (data.phone || '번호없음');
  
  var body = "솔라코어 홈페이지에서 옥상 사진이 업로드되었습니다.\n\n";
  body += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  body += "📸 사진 업로드 정보\n";
  body += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
  body += "📞 연락처: " + (data.phone || '-') + "\n";
  body += "📁 파일 이름: " + (data.fileName || '-') + "\n";
  body += "📦 파일 크기: " + (data.fileSize ? (data.fileSize / 1024 / 1024).toFixed(2) + 'MB' : '-') + "\n\n";
  body += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  body += "⏰ 제출 시간: " + Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy년 MM월 dd일 HH:mm:ss') + "\n";
  body += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
  body += "📊 Google Sheets에서 확인하기:\n";
  body += SpreadsheetApp.getActiveSpreadsheet().getUrl() + "\n\n";
  body += "⚠️ 주의: 사진 파일은 브라우저에서 미리보기만 가능하며 실제 서버 저장은 되지 않습니다.\n";
  body += "   고객에게 직접 연락하여 카카오톡 또는 이메일로 사진을 받으시기 바랍니다.\n\n";
  body += "※ 24시간 내 연락 부탁드립니다.";
  
  try {
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: body
    });
  } catch (error) {
    Logger.log('Email Error: ' + error.toString());
  }
}

// ========================================
// 응답 생성 함수
// ========================================
function createResponse(status, message) {
  var response = {
    status: status,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// ========================================
// 테스트 함수 (선택 사항)
// ========================================
function testContactForm() {
  var testData = {
    formType: 'contact',
    name: '홍길동',
    phone: '010-1234-5678',
    buildingType: '공장',
    area: '300',
    electricBill: '400',
    message: '태양광 설치 문의드립니다.'
  };
  
  var e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  var result = doPost(e);
  Logger.log(result.getContent());
}

function testPhotoForm() {
  var testData = {
    formType: 'photo',
    phone: '010-1234-5678',
    fileName: 'rooftop.jpg',
    fileSize: 2048576
  };
  
  var e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  var result = doPost(e);
  Logger.log(result.getContent());
}
```

### 2-3. 이메일 주소 수정 (중요!)
코드 상단 5번 줄:
```javascript
var ADMIN_EMAIL = "jimy9902@naver.com";  // ← 여기를 실제 이메일로 변경
```

### 2-4. 저장
- **Ctrl + S** (Mac: Cmd + S) 또는
- 상단 💾 아이콘 클릭
- 프로젝트 이름: **"솔라코어 폼 핸들러"**

---

## 🚀 STEP 3: Apps Script 배포

### 3-1. 배포 설정
1. 상단 **배포** 버튼 클릭 → **새 배포**
2. 설정:
   - **유형 선택**: ⚙️ 톱니바퀴 아이콘 → **웹 앱** 선택
   - **설명**: "솔라코어 상담 폼 v1"
   - **다음 계정으로 실행**: **나**
   - **액세스 권한**: **모든 사용자** ⚠️ 중요!
3. **배포** 클릭

### 3-2. 권한 승인
1. "승인 필요" 창 → **권한 검토** 클릭
2. Google 계정 선택
3. ⚠️ "Google에서 확인하지 않은 앱" 경고 → **고급** 클릭
4. **'프로젝트 이름'(으)로 이동** 클릭 (안전함)
5. **허용** 클릭

### 3-3. 배포 URL 복사
- **웹 앱 URL** 복사 (예: `https://script.google.com/macros/s/AKfycbx...`)
- 📋 메모장에 저장 (다음 단계에서 사용)

---

## 💻 STEP 4: 웹사이트 코드 수정

이제 프로젝트의 JavaScript 파일을 수정하겠습니다.

### 4-1. 배포 URL 설정
`js/main.js` 파일 **상단**에 추가:

```javascript
// ===================================
// Google Sheets Apps Script URL
// ===================================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
// ↑ 위 URL을 STEP 3-3에서 복사한 URL로 교체
```

---

## ✅ STEP 5: 테스트

### 5-1. Apps Script에서 테스트
1. Apps Script 에디터로 돌아가기
2. 상단 함수 선택: **testContactForm** 선택
3. **실행** 버튼 (▶️) 클릭
4. Google Sheets 확인 → "상담신청" 시트에 테스트 데이터 추가됨
5. 이메일 확인 → jimy9902@naver.com에 알림 이메일 수신

### 5-2. 웹사이트에서 테스트
1. 웹사이트 배포 후 상담 신청 폼 제출
2. 브라우저 콘솔 확인 (F12)
3. Google Sheets 확인
4. 이메일 수신 확인

---

## 🔧 문제 해결 (Troubleshooting)

### ❌ "권한 오류" 발생 시
- Apps Script 배포 설정에서 **"모든 사용자"** 선택했는지 확인
- 재배포: 배포 → 배포 관리 → 새 버전 배포

### ❌ 데이터가 저장 안됨
- Google Sheets 시트 이름 확인:
  - 상담신청 (공백 없이 정확히)
  - 사진업로드
- Apps Script 실행 로그 확인: 실행 → 실행 기록

### ❌ 이메일이 안옴
- `ADMIN_EMAIL` 변수 확인
- Gmail이 아닌 경우: Gmail로 변경 권장
- 스팸함 확인

### ❌ CORS 오류 발생
- 정상입니다! `mode: 'no-cors'` 설정으로 해결됨
- 데이터는 정상적으로 전송됨

---

## 📊 데이터 확인 방법

### Google Sheets에서 확인
1. https://sheets.google.com
2. "솔라코어 상담 신청 데이터" 스프레드시트 열기
3. 시트 탭 전환:
   - **상담신청**: 상담 신청 폼 데이터
   - **사진업로드**: 사진 업로드 폼 데이터

### 이메일로 확인
- 새 신청마다 실시간 이메일 수신
- jimy9902@naver.com (또는 설정한 이메일)

---

## 📱 추가 개선 사항 (선택)

### 1. 카카오톡 알림 추가
- https://pf.kakao.com/ 에서 채널 개설
- 웹훅 URL에 Apps Script URL 연동

### 2. 자동 응답 메시지
Apps Script에 추가:
```javascript
// 고객에게 자동 응답 이메일 발송
MailApp.sendEmail({
  to: data.phone + '@sms.example.com', // SMS 게이트웨이
  subject: '상담 신청 접수 완료',
  body: '솔라코어에 문의해주셔서 감사합니다. 24시간 내 연락드리겠습니다.'
});
```

### 3. Slack 알림 연동
```javascript
var slackWebhook = 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL';
UrlFetchApp.fetch(slackWebhook, {
  method: 'post',
  payload: JSON.stringify({
    text: '새로운 상담 신청: ' + data.name
  })
});
```

---

## 🎉 완료!

이제 솔라코어 웹사이트에서:
- ✅ 상담 신청 → Google Sheets 자동 저장
- ✅ 사진 업로드 → Google Sheets 자동 저장
- ✅ 실시간 이메일 알림 수신
- ✅ 데이터 엑셀처럼 관리 가능

---

## 📞 지원

문제 발생 시:
1. Apps Script 실행 로그 확인
2. 브라우저 콘솔 (F12) 확인
3. Google Sheets 권한 확인

**완벽한 설정을 위한 체크리스트**:
- [ ] Google Sheets 2개 시트 생성
- [ ] Apps Script 코드 붙여넣기
- [ ] ADMIN_EMAIL 수정
- [ ] 배포 (모든 사용자 권한)
- [ ] 배포 URL 복사
- [ ] js/main.js 수정
- [ ] 테스트 실행
- [ ] 실제 폼 제출 테스트

---

© 2024 솔라코어 (Solacore). All rights reserved.
