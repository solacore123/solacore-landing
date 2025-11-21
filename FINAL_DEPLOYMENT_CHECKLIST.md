# ✅ 솔라코어 최종 배포 체크리스트

배포 날짜: 2024년 11월 21일

---

## 🎉 완료된 작업

### **1️⃣ 페이지 최적화**
- ✅ 전환율 개선을 위한 전체 구조 재배치
- ✅ ROI 계산기 위치 이동 (5번 → 2번)
- ✅ Before/After 섹션 독립 추출
- ✅ Photo Upload 섹션 조기 배치 (4번)
- ✅ 3개 중간 CTA 버튼 추가

### **2️⃣ 기능 개선**
- ✅ ROI 계산기 버그 수정
  - 실제 시장 가격 반영
  - 범위 기반 표시 (예: "7~9년")
  - 용량별 차등 가격 적용
- ✅ CTA 문구 최적화
  - "내 건물 ROI 확인" → "내 수익 미리보기"
  - "한 달 전기요금" → "한 달 전기요금 (청구서 확인)"
- ✅ 모바일 최적화
  - 배경 이미지 가시성 개선
  - Before/After 화살표 모바일 레이아웃 수정

### **3️⃣ 백엔드 연동**
- ✅ Google Sheets 데이터 수집
  - 상담 신청 폼 연동 완료
  - 사진 업로드 폼 연동 완료
- ✅ 이메일 알림 설정
  - 수신 주소: alstj36382@gmail.com
  - 상담 신청 알림
  - 사진 업로드 알림
- ✅ Google Drive 연동 준비
  - Base64 인코딩 구현
  - Apps Script 코드 작성 완료
  - 사용자 설정 대기 중

### **4️⃣ UI/UX 개선**
- ✅ 전화 기능 제거 (대표번호 생성 전)
  - Floating Call 버튼 제거
  - Contact 섹션 전화번호 제거
  - Footer 전화번호 제거
  - 이메일로 대체
- ✅ 성공 메시지 간소화
  - "Google Drive에 저장되었습니다" 문구 제거
  - "사진이 성공적으로 전송되었습니다" 단순화

---

## ⏳ 배포 후 필요한 작업

### **🔧 필수 작업 (사진 업로드 기능 완성)**

#### **Step 1: Google Drive 폴더 설정**
1. https://drive.google.com 접속
2. 폴더 생성: "솔라코어_옥상사진"
3. 폴더 열고 URL에서 ID 복사
   ```
   https://drive.google.com/drive/folders/[폴더_ID]
   ```
4. 폴더 ID 메모: `1G8mVmlqDrQhAGQb-kGdWXSr34g5pYkm5` ✅

#### **Step 2: Apps Script 업데이트**
1. Google Sheets → 확장 프로그램 → Apps Script
2. 기존 코드 삭제
3. `apps-script-with-drive.js` 내용 복사 → 붙여넣기
4. **13번째 줄 수정**:
   ```javascript
   var DRIVE_FOLDER_ID = "1G8mVmlqDrQhAGQb-kGdWXSr34g5pYkm5";
   ```
5. Ctrl + S 저장

#### **Step 3: Apps Script 재배포**
1. 배포 → 배포 관리
2. 연필 아이콘 클릭
3. 버전: "새 버전"
4. 배포 클릭
5. 기존 URL 그대로 사용됨 ✅

#### **Step 4: 테스트**
1. Apps Script에서 `testPhotoForm` 실행
2. Gmail 확인 (사진 링크 포함 여부)
3. Google Drive 확인 (테스트 이미지 저장 여부)
4. 웹사이트에서 실제 사진 업로드 테스트

**예상 소요 시간**: 5~10분

---

## 📦 배포할 파일

### **✅ 포함해야 할 파일:**
```
solacore-landing/
├── index.html          ← 메인 페이지
├── css/
│   └── style.css       ← 스타일시트
├── js/
│   └── main.js         ← JavaScript
└── images/             ← 이미지 (있다면)
```

### **❌ 배포하지 말 것:**
```
index-old.html
README.md
GOOGLE_SHEETS_SETUP.md
PHOTO_UPLOAD_SETUP.md
apps-script-with-drive.js
DEPLOYMENT_GUIDE.md
SETUP_CHECKLIST.md
QUICK_START.md
```

---

## 🚀 배포 방법 (선택)

### **Option 1: Netlify (추천)**
1. https://netlify.com 접속
2. "Add new site" → "Deploy manually"
3. 프로젝트 폴더 드래그 앤 드롭
4. 완료! URL 자동 생성

### **Option 2: GitHub Pages**
1. GitHub 저장소 생성
2. 파일 업로드
3. Settings → Pages → Deploy
4. 완료! URL: `https://username.github.io/repo-name`

### **Option 3: Vercel**
1. https://vercel.com 접속
2. "Add New Project"
3. 폴더 선택 → Deploy
4. 완료! URL 자동 생성

---

## 🧪 배포 후 테스트 항목

### **1. 기본 기능**
- [ ] 웹사이트 로드 확인
- [ ] 모든 섹션 표시 확인
- [ ] 네비게이션 링크 작동
- [ ] 모바일 반응형 확인

### **2. ROI 계산기**
- [ ] 슬라이더 조작 가능
- [ ] 실시간 계산 작동
- [ ] 범위 표시 정확 (예: "7~9년")
- [ ] 모바일에서도 정상 작동

### **3. Before/After 섹션**
- [ ] 화살표가 모바일에서 제대로 표시
- [ ] "태양광 설치" 텍스트 읽기 편함
- [ ] 카드 레이아웃 정상

### **4. 상담 신청 폼**
- [ ] 입력 필드 정상 작동
- [ ] 제출 버튼 클릭 가능
- [ ] 성공 메시지 표시
- [ ] Google Sheets에 데이터 저장
- [ ] 이메일 수신 (alstj36382@gmail.com)

### **5. 사진 업로드 폼**
- [ ] 파일 선택 가능
- [ ] 미리보기 표시
- [ ] 10MB 이하 제한 작동
- [ ] 제출 성공 메시지
- [ ] Google Sheets에 데이터 저장
- [ ] (Drive 설정 후) 이메일에 사진 링크

---

## 📊 현재 설정 값

### **Google Apps Script**
- **배포 URL**: 설정됨 ✅
  ```javascript
  https://script.google.com/macros/s/AKfycbzNkeP4iVuFLce6a9sIF9VkujAMqILL-3RGNSSDKMnzwn33PqxUE9vNXsSyOpmt8155LA/exec
  ```
- **이메일**: alstj36382@gmail.com ✅
- **Drive 폴더 ID**: `1G8mVmlqDrQhAGQb-kGdWXSr34g5pYkm5` ⚠️ (설정 필요)

### **Google Sheets**
- **시트 이름**:
  - 상담신청 ✅
  - 사진업로드 ✅

### **연락처 정보**
- **이메일**: alstj36382@gmail.com ✅
- **전화번호**: 미설정 (대표번호 생성 전) ✅

---

## 🎯 예상 성과

### **전환율 개선**
- **기존**: 2~3%
- **목표**: 6~8%
- **개선율**: 140~220% 증가

### **사용자 행동 개선**
- ROI 계산기 참여율: 40~60%
- 사진 업로드 전환율: 15~25%
- 멀티터치 전환: 30~40%

---

## 📅 향후 계획

### **단기 (1주일 내)**
- [ ] Google Drive 사진 업로드 활성화
- [ ] 실제 문의 대응 프로세스 확립
- [ ] 전환율 데이터 수집 시작

### **중기 (1개월 내)**
- [ ] 대표번호 생성 및 추가
- [ ] 카카오 채널 연동
- [ ] Google Analytics 설치
- [ ] 커스텀 도메인 연결

### **장기 (3개월 내)**
- [ ] A/B 테스트 진행
- [ ] 사용자 피드백 수집
- [ ] 추가 최적화 진행
- [ ] 추가 사례 및 후기 업데이트

---

## 💡 추천 사항

### **배포 직후**
1. 모든 기능 테스트 (위 체크리스트 참조)
2. Google Drive 설정 완료
3. 테스트 문의 제출해보기
4. 스마트폰에서 직접 테스트

### **첫 주**
1. 매일 Google Sheets 확인
2. 문의에 24시간 내 응답
3. 전환율 데이터 기록
4. 문제점 발견 시 즉시 수정

### **지속적 개선**
1. 월 1회 전환율 리뷰
2. 사용자 피드백 반영
3. 경쟁사 벤치마킹
4. 새로운 사례 추가

---

## 🆘 문제 발생 시

### **배포 문제**
→ `DEPLOYMENT_GUIDE.md` 참조

### **Google Sheets 연동 문제**
→ `GOOGLE_SHEETS_SETUP.md` 참조

### **사진 업로드 문제**
→ `PHOTO_UPLOAD_SETUP.md` 참조

### **기타 문제**
→ `README.md` 참조

---

## ✅ 최종 확인

배포 전 마지막 체크:
- [ ] 모든 필수 파일 포함
- [ ] 불필요한 파일 제외
- [ ] Google Script URL 설정됨
- [ ] 이메일 주소 올바름
- [ ] 연락처 정보 최신 상태

**모두 체크되었으면 배포 시작! 🚀**

---

## 🎉 배포 완료 후

축하합니다! 솔라코어 웹사이트가 성공적으로 배포되었습니다!

**다음 단계:**
1. ✅ 배포 URL 저장 및 공유
2. ✅ Google Drive 설정 완료
3. ✅ 전체 기능 테스트
4. ✅ 첫 번째 문의 대응 준비

**성공을 기원합니다!** 🌞✨

---

© 2024 솔라코어 (Solacore). All rights reserved.
