# ✅ 솔라코어 웹사이트 설정 체크리스트

## 🎯 배포 전 필수 설정 항목

### 1️⃣ Google Sheets 연동 (필수!)

**현재 상태**: ❌ 미설정 (폼 제출이 저장되지 않음)

**설정 방법**: 📋 `GOOGLE_SHEETS_SETUP.md` 파일 참조

**체크리스트**:
- [ ] Google Sheets 생성 ("상담신청" + "사진업로드" 시트)
- [ ] Apps Script 코드 붙여넣기
- [ ] `ADMIN_EMAIL` 변수 수정 (jimy9902@naver.com)
- [ ] Apps Script 배포 (모든 사용자 권한)
- [ ] 배포 URL 복사
- [ ] `js/main.js` 파일 수정 (7번째 줄)
  ```javascript
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
  ```
- [ ] 테스트 폼 제출
- [ ] Google Sheets에 데이터 저장 확인
- [ ] 이메일 수신 확인

**소요 시간**: 약 5~10분

---

### 2️⃣ 웹사이트 배포

**배포 방법**: Netlify / Vercel / GitHub Pages

**체크리스트**:
- [ ] 배포 플랫폼 선택
- [ ] 프로젝트 파일 업로드
- [ ] 배포 URL 확인
- [ ] 모든 페이지 동작 테스트

**참고**: `README.md`의 "배포 방법" 섹션 참조

---

### 3️⃣ 연락처 정보 확인

**체크리스트**:
- [ ] 전화번호: 061-337-9902 ✅
- [ ] 모바일: 010-6638-9902 ✅
- [ ] 이메일: jimy9902@naver.com ✅
- [ ] 주소: 전남 나주시 금천면 중정리 475-7 ✅

**파일 위치**:
- `index.html` (Footer, Contact 섹션)
- `js/main.js` (에러 메시지)

---

### 4️⃣ Google Analytics 설정 (선택)

**현재 상태**: ❌ 미설정

**설정 방법**:
1. https://analytics.google.com 에서 계정 생성
2. 측정 ID 발급 (예: G-XXXXXXXXXX)
3. `index.html` `<head>` 태그에 추가:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**체크리스트**:
- [ ] Google Analytics 계정 생성
- [ ] 측정 ID 발급
- [ ] `index.html`에 스크립트 추가
- [ ] 실시간 방문자 확인

---

### 5️⃣ 카카오톡 채널 연동 (선택, 강력 추천!)

**현재 상태**: ❌ 미설정

**설정 방법**:
1. https://center-pf.kakao.com 접속
2. "솔라코어" 채널 생성
3. 채널 URL 복사 (예: https://pf.kakao.com/_xxxxx)
4. 웹사이트에 버튼 추가

**체크리스트**:
- [ ] 카카오톡 채널 개설
- [ ] 채널 프로필 설정
- [ ] 채널 URL 복사
- [ ] 웹사이트 버튼 추가
  - Hero 섹션 CTA
  - Contact 섹션
  - Floating 버튼

**추가 코드 예시**:
```html
<a href="https://pf.kakao.com/_xxxxx/chat" target="_blank" class="btn btn-kakao">
    <i class="fas fa-comment"></i> 카카오톡 상담
</a>
```

---

### 6️⃣ SEO 최적화 (선택)

**체크리스트**:
- [ ] Meta description 확인
- [ ] Title 태그 확인
- [ ] Open Graph 태그 추가
  ```html
  <meta property="og:title" content="솔라코어 - 노는 옥상 돈 벌게 해드려요">
  <meta property="og:description" content="연 3,000만원 이상 수익 발생">
  <meta property="og:image" content="https://your-site.com/images/og-image.jpg">
  <meta property="og:url" content="https://your-site.com">
  ```
- [ ] Favicon 추가
- [ ] Sitemap 생성
- [ ] Google Search Console 등록

---

### 7️⃣ 보안 설정 (선택)

**체크리스트**:
- [ ] HTTPS 적용 (Netlify/Vercel 자동)
- [ ] reCAPTCHA 추가 (스팸 방지)
- [ ] CSP 헤더 설정

---

## 🚀 배포 후 최종 테스트

### 필수 테스트:
- [ ] **상담 신청 폼 제출** → Google Sheets 저장 확인
- [ ] **사진 업로드 폼 제출** → Google Sheets 저장 확인
- [ ] **이메일 알림 수신** 확인
- [ ] **전화번호 클릭** → 통화 앱 실행 확인
- [ ] **모바일 반응형** 확인 (iPhone, Galaxy)
- [ ] **ROI 계산기** 동작 확인
- [ ] **FAQ 아코디언** 동작 확인
- [ ] **모든 링크** 작동 확인

### 브라우저 테스트:
- [ ] Chrome (PC + 모바일)
- [ ] Safari (Mac + iPhone)
- [ ] Edge
- [ ] Firefox

### 성능 테스트:
- [ ] PageSpeed Insights (https://pagespeed.web.dev/)
  - 목표: Desktop 90+, Mobile 80+
- [ ] 로딩 속도 확인 (3초 이내)
- [ ] 이미지 최적화 확인

---

## 📊 배포 완료 후 할 일

### 1주일 후:
- [ ] Google Analytics 데이터 확인
- [ ] Google Sheets 상담 신청 데이터 분석
- [ ] 전환율 측정
- [ ] 사용자 피드백 수집

### 1개월 후:
- [ ] A/B 테스트 (ROI 계산기 위치, CTA 버튼 등)
- [ ] 실제 시공 사진으로 교체
- [ ] 실제 고객 후기 추가
- [ ] 블로그 콘텐츠 추가 (SEO)

---

## ⚠️ 주의사항

### 반드시 확인:
1. **Google Sheets 연동 필수**: 미설정 시 고객 데이터 손실!
2. **배포 URL 공유 전**: 모든 기능 테스트 완료
3. **연락처 정확성**: 전화번호, 이메일 확인
4. **이미지 라이센스**: 스톡 이미지 라이센스 확인

### 문제 발생 시:
- **Google Sheets 오류**: `GOOGLE_SHEETS_SETUP.md` Troubleshooting 섹션
- **폼 전송 실패**: 브라우저 콘솔 (F12) 확인
- **이메일 미수신**: 스팸함 확인, Gmail 사용 권장

---

## 📞 지원

설정 중 문제가 발생하면:
1. 각 파일의 문서 확인
2. 브라우저 개발자 도구 (F12) 콘솔 확인
3. Google Apps Script 실행 로그 확인

---

## ✅ 최종 체크

### 배포 준비 완료 조건:
- ✅ Google Sheets 연동 완료
- ✅ 테스트 폼 제출 성공
- ✅ 이메일 수신 확인
- ✅ 모바일 반응형 확인
- ✅ 모든 링크 작동 확인

**위 항목이 모두 체크되면 배포하세요!** 🚀

---

© 2024 솔라코어 (Solacore). All rights reserved.
