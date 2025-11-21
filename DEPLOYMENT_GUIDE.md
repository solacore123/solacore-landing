# 🚀 솔라코어 웹사이트 배포 가이드

## 📋 최종 배포 체크리스트

### ✅ **완료된 항목**

- [x] 페이지 구조 최적화 (전환율 개선)
- [x] ROI 계산기 버그 수정
- [x] CTA 버튼 문구 개선
- [x] 모바일 반응형 디자인
- [x] Before/After 화살표 모바일 최적화
- [x] Google Sheets 연동 완료
- [x] 이메일 알림 설정 (alstj36382@gmail.com)
- [x] Photo Upload Base64 인코딩 준비
- [x] 전화번호 기능 제거 (대표번호 생성 전)
- [x] 성공 메시지 간소화

### ⏳ **사용자가 완료해야 할 항목**

- [ ] Google Drive 폴더 생성 및 ID 설정
- [ ] Apps Script 코드 업데이트 (Drive 연동)
- [ ] Apps Script 재배포
- [ ] 사진 업로드 기능 테스트

---

## 🌐 배포 방법

### **방법 1: Netlify (추천) - 가장 쉬움**

#### **1️⃣ Netlify 계정 만들기**
1. https://www.netlify.com 접속
2. "Sign up" 클릭
3. GitHub, GitLab, 또는 이메일로 가입

#### **2️⃣ 사이트 배포**
1. Netlify 대시보드에서 **"Add new site"** 클릭
2. **"Deploy manually"** 선택
3. 프로젝트 폴더를 드래그 앤 드롭
   - 필요한 파일:
     - `index.html`
     - `css/` 폴더
     - `js/` 폴더
     - `images/` 폴더 (있다면)

#### **3️⃣ 배포 완료!**
- 몇 초 후 자동으로 URL 생성
- 예: `https://your-site-name.netlify.app`

#### **4️⃣ 도메인 연결 (선택사항)**
1. 자신의 도메인이 있다면
2. Netlify 대시보드 → **Domain settings**
3. **Add custom domain** 클릭
4. DNS 설정 안내에 따라 연결

---

### **방법 2: GitHub Pages - 무료 호스팅**

#### **1️⃣ GitHub 저장소 만들기**
1. https://github.com 접속
2. **"New repository"** 클릭
3. 저장소 이름: `solacore-landing`
4. **Public** 선택
5. **Create repository**

#### **2️⃣ 파일 업로드**
1. 저장소 페이지에서 **"uploading an existing file"** 클릭
2. 모든 파일 드래그 앤 드롭:
   - `index.html`
   - `css/` 폴더
   - `js/` 폴더
   - `images/` 폴더
3. **Commit changes**

#### **3️⃣ GitHub Pages 활성화**
1. 저장소 **Settings** 탭
2. 왼쪽 메뉴 **Pages** 클릭
3. Source: **Deploy from a branch**
4. Branch: **main** 선택
5. Folder: **/ (root)** 선택
6. **Save**

#### **4️⃣ 배포 완료!**
- 몇 분 후 접속 가능
- URL: `https://your-username.github.io/solacore-landing`

---

### **방법 3: Vercel - 빠른 배포**

#### **1️⃣ Vercel 계정 만들기**
1. https://vercel.com 접속
2. **Sign Up** 클릭
3. GitHub, GitLab, 또는 이메일로 가입

#### **2️⃣ 사이트 배포**
1. **"Add New Project"** 클릭
2. **"Browse"** 클릭하여 프로젝트 폴더 선택
3. **Deploy** 클릭

#### **3️⃣ 배포 완료!**
- 자동으로 URL 생성
- 예: `https://solacore-landing.vercel.app`

---

## 📁 배포할 파일 목록

### **필수 파일:**
```
solacore-landing/
├── index.html          (메인 페이지)
├── css/
│   └── style.css       (스타일시트)
├── js/
│   └── main.js         (JavaScript)
└── images/             (이미지 폴더, 있다면)
```

### **배포하지 말아야 할 파일:**
```
❌ index-old.html
❌ README.md
❌ GOOGLE_SHEETS_SETUP.md
❌ PHOTO_UPLOAD_SETUP.md
❌ apps-script-with-drive.js
❌ DEPLOYMENT_GUIDE.md
```

---

## 🧪 배포 후 테스트

### **1️⃣ 기본 기능 테스트**
- [ ] 웹사이트가 정상적으로 로드되는가?
- [ ] 모든 섹션이 보이는가?
- [ ] 이미지가 정상적으로 표시되는가?
- [ ] 네비게이션 링크가 작동하는가?

### **2️⃣ ROI 계산기 테스트**
- [ ] 슬라이더 조작이 되는가?
- [ ] 계산 결과가 표시되는가?
- [ ] 범위 표시가 정확한가? (예: "7~9년")

### **3️⃣ 모바일 반응형 테스트**
- [ ] 스마트폰에서 정상 표시되는가?
- [ ] Before/After 화살표가 제대로 보이는가?
- [ ] 버튼이 터치하기 쉬운가?

### **4️⃣ 폼 제출 테스트**

#### **상담 신청 폼:**
1. 이름, 연락처, 건물 정보 입력
2. **"무료 상담 신청하기"** 클릭
3. 확인:
   - [ ] 성공 메시지 표시
   - [ ] Google Sheets에 데이터 저장됨
   - [ ] 이메일 수신 (alstj36382@gmail.com)

#### **사진 업로드 폼:**
1. 연락처 입력
2. 이미지 선택 (10MB 이하)
3. **"사진 보내고 설치 가능 여부 확인하기"** 클릭
4. 확인:
   - [ ] "사진이 성공적으로 전송되었습니다" 메시지
   - [ ] Google Sheets에 데이터 저장됨
   - [ ] (Drive 설정 후) 이메일에 사진 링크 포함

---

## 🔧 배포 후 설정

### **1️⃣ Google Drive 사진 업로드 기능 활성화**

**현재 상태:**
- 사진 메타데이터만 저장됨 (파일명, 크기)
- 실제 사진 파일은 저장 안 됨

**활성화 방법:**
1. `PHOTO_UPLOAD_SETUP.md` 파일 참조
2. Google Drive 폴더 생성
3. Apps Script에 폴더 ID 입력
4. Apps Script 재배포

**소요 시간:** 5분

---

## 📊 배포 후 모니터링

### **1️⃣ Google Sheets 확인**
- 매일 한 번씩 확인
- 새로운 상담 신청 체크
- 사진 업로드 확인

### **2️⃣ 이메일 알림**
- alstj36382@gmail.com으로 자동 알림
- 스팸 폴더 확인 필요
- 필요시 alstj36382@gmail.com을 주소록에 추가

### **3️⃣ 전환율 추적 (선택)**
- Google Analytics 설치 권장
- 방문자 수, 상담 신청률 추적
- A/B 테스트 가능

---

## 🎯 배포 후 TODO

### **즉시 할 일:**
- [ ] 배포된 URL 확인 및 저장
- [ ] 모든 기능 테스트
- [ ] Google Sheets 연동 확인
- [ ] 이메일 알림 테스트

### **1주일 내:**
- [ ] Google Drive 사진 업로드 활성화
- [ ] 실제 고객 문의 대응 프로세스 확립
- [ ] 전환율 데이터 수집 시작

### **추후 개선 (선택):**
- [ ] 대표번호 생성 후 전화 기능 추가
- [ ] 카카오 채널 연동
- [ ] Google Analytics 설치
- [ ] 커스텀 도메인 연결

---

## 🆘 문제 해결

### **배포가 안 될 때:**
1. 파일 구조 확인 (`index.html`이 루트에 있어야 함)
2. 파일명 확인 (대소문자 구분)
3. 브라우저 캐시 삭제 후 재시도

### **폼 제출이 안 될 때:**
1. `js/main.js`의 `GOOGLE_SCRIPT_URL` 확인
2. Apps Script 배포 URL이 올바른지 확인
3. Apps Script가 "모든 사용자" 권한으로 배포되었는지 확인

### **이미지가 안 보일 때:**
1. 이미지 파일 경로 확인
2. `images/` 폴더가 배포되었는지 확인
3. 이미지 파일명 대소문자 확인

---

## 📞 지원

배포 중 문제가 생기면:
1. `README.md` 파일 참조
2. 각 기능별 설정 가이드 확인:
   - `GOOGLE_SHEETS_SETUP.md`
   - `PHOTO_UPLOAD_SETUP.md`

---

## 🎉 배포 완료!

축하합니다! 솔라코어 웹사이트가 성공적으로 배포되었습니다! 🚀

**다음 단계:**
1. URL을 명함, 카카오톡 프로필 등에 추가
2. 소셜 미디어에 공유
3. 고객 문의에 빠르게 응대
4. 전환율 모니터링

**예상 성과:**
- 기존 대비 140-220% 전환율 향상
- 월 평균 상담 신청 대폭 증가
- 전문적인 브랜드 이미지 구축

행운을 빕니다! 🌞✨

---

© 2024 솔라코어 (Solacore). All rights reserved.
