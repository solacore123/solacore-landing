// ========================================
// 솔라코어 - Google Sheets + Drive 자동화 스크립트
// ========================================

// 📧 이메일 수신 주소 설정
var ADMIN_EMAIL = "alstj36382@gmail.com";

// 📊 시트 이름 설정
var SHEET_NAME_CONTACT = "상담신청";
var SHEET_NAME_PHOTO = "사진업로드";

// 📁 Google Drive 폴더 ID (여기에 Step 1에서 복사한 폴더 ID 입력!)
var DRIVE_FOLDER_ID = "YOUR_FOLDER_ID_HERE";
// 예: "1abc123def456ghi789"

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
// 사진 업로드 폼 처리 (Google Drive 저장)
// ========================================
function handlePhotoForm(spreadsheet, data) {
  var sheet = spreadsheet.getSheetByName(SHEET_NAME_PHOTO);
  
  // 시트가 없으면 생성
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME_PHOTO);
    sheet.appendRow(['연락처', '파일이름', '파일크기(MB)', '제출시간', '사진링크']);
  }
  
  var timestamp = new Date();
  var fileSizeMB = data.fileSize ? (data.fileSize / 1024 / 1024).toFixed(2) : '0';
  
  // Google Drive에 사진 저장
  var driveFileUrl = '';
  if (data.fileData && data.fileName) {
    try {
      driveFileUrl = savePhotoToDrive(data.fileData, data.fileName, data.phone);
    } catch (error) {
      Logger.log('Drive upload error: ' + error.toString());
      driveFileUrl = 'Upload failed: ' + error.toString();
    }
  }
  
  // 데이터 추가
  sheet.appendRow([
    data.phone || '',
    data.fileName || '',
    fileSizeMB,
    Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'),
    driveFileUrl
  ]);
  
  // 이메일 발송 (사진 링크 포함)
  sendPhotoEmail(data, timestamp, driveFileUrl);
  
  return createResponse('success', '사진 업로드가 완료되었습니다.');
}

// ========================================
// Google Drive에 사진 저장
// ========================================
function savePhotoToDrive(base64Data, fileName, phone) {
  try {
    // 폴더 ID 확인
    if (!DRIVE_FOLDER_ID || DRIVE_FOLDER_ID === 'YOUR_FOLDER_ID_HERE') {
      throw new Error('Google Drive 폴더 ID가 설정되지 않았습니다.');
    }
    
    // Base64 데이터에서 실제 이미지 데이터 추출
    var base64String = base64Data.split(',')[1]; // "data:image/jpeg;base64," 부분 제거
    var mimeType = base64Data.split(',')[0].split(':')[1].split(';')[0];
    
    // Base64를 Blob으로 변환
    var bytes = Utilities.base64Decode(base64String);
    var blob = Utilities.newBlob(bytes, mimeType, fileName);
    
    // Google Drive 폴더 가져오기
    var folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    
    // 파일 이름에 타임스탬프와 연락처 추가
    var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
    var newFileName = timestamp + '_' + phone.replace(/-/g, '') + '_' + fileName;
    
    // 파일 생성
    var file = folder.createFile(blob.setName(newFileName));
    
    // 파일을 누구나 볼 수 있게 설정 (링크 있는 사람만)
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // 파일 URL 반환
    return file.getUrl();
    
  } catch (error) {
    Logger.log('savePhotoToDrive error: ' + error.toString());
    throw error;
  }
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
// 사진 업로드 이메일 발송 (Google Drive 링크 포함)
// ========================================
function sendPhotoEmail(data, timestamp, driveFileUrl) {
  var subject = "📸 [솔라코어] 새로운 옥상 사진 업로드 - " + (data.phone || '번호없음');
  
  var body = "솔라코어 홈페이지에서 옥상 사진이 업로드되었습니다.\n\n";
  body += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  body += "📸 사진 업로드 정보\n";
  body += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
  body += "📞 연락처: " + (data.phone || '-') + "\n";
  body += "📁 파일 이름: " + (data.fileName || '-') + "\n";
  body += "📦 파일 크기: " + (data.fileSize ? (data.fileSize / 1024 / 1024).toFixed(2) + 'MB' : '-') + "\n\n";
  
  if (driveFileUrl && driveFileUrl !== '') {
    body += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    body += "📷 사진 보기 (Google Drive)\n";
    body += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    body += "🔗 사진 링크:\n" + driveFileUrl + "\n\n";
    body += "※ 위 링크를 클릭하면 업로드된 사진을 바로 확인하실 수 있습니다.\n\n";
  } else {
    body += "⚠️ 사진 업로드에 실패했습니다. 고객에게 직접 연락하여 사진을 받아주세요.\n\n";
  }
  
  body += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  body += "⏰ 제출 시간: " + Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy년 MM월 dd일 HH:mm:ss') + "\n";
  body += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
  body += "📊 Google Sheets에서 확인하기:\n";
  body += SpreadsheetApp.getActiveSpreadsheet().getUrl() + "\n\n";
  body += "📁 Google Drive 폴더 바로가기:\n";
  body += "https://drive.google.com/drive/folders/" + DRIVE_FOLDER_ID + "\n\n";
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
// 테스트 함수
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
  // 테스트용 작은 이미지 (1x1 픽셀 PNG)
  var testImageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  
  var testData = {
    formType: 'photo',
    phone: '010-1234-5678',
    fileName: 'test-rooftop.png',
    fileSize: 1024,
    fileData: testImageBase64
  };
  
  var e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  var result = doPost(e);
  Logger.log(result.getContent());
}
