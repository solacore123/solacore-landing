// ===================================
// Solar Core - Landing Page JavaScript
// ===================================

// ===================================
// Google Sheets Apps Script URL 설정
// ===================================
// 🔧 아래 URL을 Google Apps Script 배포 URL로 교체하세요
// 설정 방법: GOOGLE_SHEETS_SETUP.md 파일 참조
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzNkeP4iVuFLce6a9sIF9VkujAMqILL-3RGNSSDKMnzwn33PqxUE9vNXsSyOpmt8155LA/exec';
// 예시: 'https://script.google.com/macros/s/AKfycbx.../exec'

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        
        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }
    
    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // Header Scroll Effect
    // ===================================
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 16px rgba(10, 36, 99, 0.12)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(10, 36, 99, 0.08)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ===================================
    // Fixed CTA Button
    // ===================================
    const fixedCTA = document.querySelector('.fixed-cta');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 800) {
            fixedCTA.classList.add('visible');
        } else {
            fixedCTA.classList.remove('visible');
        }
    });
    
    // ===================================
    // FAQ Accordion
    // ===================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
    
    // ===================================
    // Scroll Reveal Animation
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.benefit-card, .simulator-card, .trust-card, .process-step, .case-card, .highlight-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ===================================
    // Contact Form Handling
    // ===================================
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const buildingType = document.getElementById('buildingType').value;
            const privacy = document.getElementById('privacy').checked;
            
            if (!name) {
                alert('이름을 입력해주세요.');
                document.getElementById('name').focus();
                return;
            }
            
            if (!phone) {
                alert('연락처를 입력해주세요.');
                document.getElementById('phone').focus();
                return;
            }
            
            // Phone number validation (Korean format)
            const phoneRegex = /^(01[0-9])-?([0-9]{3,4})-?([0-9]{4})$/;
            if (!phoneRegex.test(phone.replace(/-/g, ''))) {
                alert('올바른 연락처 형식을 입력해주세요. (예: 010-0000-0000)');
                document.getElementById('phone').focus();
                return;
            }
            
            if (!buildingType) {
                alert('건물 유형을 선택해주세요.');
                document.getElementById('buildingType').focus();
                return;
            }
            
            if (!privacy) {
                alert('개인정보 수집 및 이용에 동의해주세요.');
                return;
            }
            
            // Collect form data
            const formData = {
                formType: 'contact',
                name: name,
                phone: phone,
                buildingType: buildingType,
                area: document.getElementById('area').value,
                electricBill: document.getElementById('electricBill').value,
                message: document.getElementById('message').value,
                submittedAt: new Date().toISOString()
            };
            
            // 전송 버튼 비활성화 (중복 제출 방지)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 전송 중...';
            
            // Google Sheets로 전송
            if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
                fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // CORS 우회 (필수)
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                .then(function() {
                    // no-cors 모드에서는 응답 확인 불가능 (정상 작동으로 간주)
                    console.log('✅ 상담 신청이 Google Sheets에 저장되었습니다:', formData);
                    
                    // 성공 모달 표시
                    successModal.classList.add('active');
                    
                    // 폼 초기화
                    contactForm.reset();
                    
                    // 버튼 복구
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    
                    // Google Analytics 이벤트
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'form_submission', {
                            'event_category': 'Contact',
                            'event_label': 'Solar Consultation Form'
                        });
                    }
                })
                .catch(function(error) {
                    console.error('❌ 전송 오류:', error);
                    alert('전송에 실패했습니다.\n\n전화로 문의해주세요:\n061-337-9902 또는 010-6638-9902');
                    
                    // 버튼 복구
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                });
            } else {
                // Google Script URL이 설정되지 않은 경우
                console.warn('⚠️ Google Script URL이 설정되지 않았습니다.');
                console.log('📋 폼 데이터:', formData);
                alert('시스템 설정이 완료되지 않았습니다.\n\nGOOGLE_SHEETS_SETUP.md 파일을 참조하여\nGoogle Apps Script URL을 설정해주세요.\n\n또는 전화로 문의해주세요: 061-337-9902');
                
                // 버튼 복구
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
    
    // ===================================
    // Phone Number Formatting
    // ===================================
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            if (value.length > 6) {
                value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7);
            } else if (value.length > 3) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            }
            
            e.target.value = value;
        });
    }
    
    // ===================================
    // Modal Close Function
    // ===================================
    window.closeModal = function() {
        successModal.classList.remove('active');
    };
    
    // Close modal when clicking outside
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                closeModal();
            }
        });
        
        // Close modal with close button
        const modalCloseBtn = successModal.querySelector('.modal-close');
        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeModal);
        }
        
        // Close modal with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && successModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    // ===================================
    // Number Animation on Scroll
    // ===================================
    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number with commas
            const formatted = Math.floor(current).toLocaleString('ko-KR');
            element.textContent = formatted;
        }, 16);
    }
    
    // Animate stats banner numbers
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const target = parseInt(entry.target.getAttribute('data-target'));
                
                if (!isNaN(target)) {
                    entry.target.textContent = '0';
                    animateNumber(entry.target, target, 2000);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(el => {
        statsObserver.observe(el);
    });
    
    // Animate trust numbers when visible
    const trustNumbers = document.querySelectorAll('.trust-number');
    const trustObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                
                if (!isNaN(number)) {
                    entry.target.textContent = '0';
                    animateNumber(entry.target, number);
                }
            }
        });
    }, { threshold: 0.5 });
    
    trustNumbers.forEach(el => {
        if (!el.textContent.includes('A/S') && !el.textContent.includes('년')) {
            trustObserver.observe(el);
        }
    });
    
    // ===================================
    // Lazy Loading for Images
    // ===================================
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===================================
    // Scroll Progress Indicator (Optional)
    // ===================================
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // You can use this to show a progress bar
        // document.getElementById('scrollProgress').style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // ===================================
    // Browser Detection & Optimization
    // ===================================
    const isIE = /MSIE|Trident/.test(navigator.userAgent);
    if (isIE) {
        document.body.classList.add('ie-browser');
        console.warn('Internet Explorer detected. Some features may not work optimally.');
    }
    
    // ===================================
    // Photo Upload Form Handling
    // ===================================
    const photoUploadForm = document.getElementById('photoUploadForm');
    const fileUploadBtn = document.getElementById('fileUploadBtn');
    const uploadPhotoInput = document.getElementById('upload-photo');
    const filePreview = document.getElementById('filePreview');
    const previewImage = document.getElementById('previewImage');
    const fileRemoveBtn = document.getElementById('fileRemoveBtn');
    const uploadPhoneInput = document.getElementById('upload-phone');
    
    // File upload button click handler
    if (fileUploadBtn && uploadPhotoInput) {
        fileUploadBtn.addEventListener('click', function() {
            uploadPhotoInput.click();
        });
    }
    
    // File input change handler (preview)
    if (uploadPhotoInput) {
        uploadPhotoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                // Validate file type
                const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                if (!validTypes.includes(file.type)) {
                    alert('JPG 또는 PNG 파일만 업로드 가능합니다.');
                    uploadPhotoInput.value = '';
                    return;
                }
                
                // Validate file size (max 10MB)
                const maxSize = 10 * 1024 * 1024; // 10MB in bytes
                if (file.size > maxSize) {
                    alert('파일 크기는 10MB를 초과할 수 없습니다.');
                    uploadPhotoInput.value = '';
                    return;
                }
                
                // Show preview
                const reader = new FileReader();
                reader.onload = function(event) {
                    previewImage.src = event.target.result;
                    filePreview.style.display = 'block';
                    fileUploadBtn.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // File remove button handler
    if (fileRemoveBtn) {
        fileRemoveBtn.addEventListener('click', function() {
            uploadPhotoInput.value = '';
            previewImage.src = '';
            filePreview.style.display = 'none';
            fileUploadBtn.style.display = 'flex';
        });
    }
    
    // Phone number formatting for upload form
    if (uploadPhoneInput) {
        uploadPhoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            if (value.length > 6) {
                value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7);
            } else if (value.length > 3) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            }
            
            e.target.value = value;
        });
    }
    
    // Photo upload form submission
    if (photoUploadForm) {
        photoUploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phone = uploadPhoneInput.value.trim();
            const file = uploadPhotoInput.files[0];
            
            // Validation
            if (!phone) {
                alert('연락처를 입력해주세요.');
                uploadPhoneInput.focus();
                return;
            }
            
            const phoneRegex = /^(01[0-9])-?([0-9]{3,4})-?([0-9]{4})$/;
            if (!phoneRegex.test(phone.replace(/-/g, ''))) {
                alert('올바른 연락처 형식을 입력해주세요. (예: 010-0000-0000)');
                uploadPhoneInput.focus();
                return;
            }
            
            if (!file) {
                alert('옥상 사진을 선택해주세요.');
                return;
            }
            
            // Convert file to Base64 for upload to Google Drive
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64Data = e.target.result;
                
                // Collect form data with Base64 image
                const formData = {
                    formType: 'photo',
                    phone: phone,
                    fileName: file.name,
                    fileSize: file.size,
                    fileType: file.type,
                    fileData: base64Data, // Base64 인코딩된 이미지 데이터
                    submittedAt: new Date().toISOString()
                };
                
                // Send to Google Sheets
                sendPhotoToGoogleSheets(formData);
            };
            reader.readAsDataURL(file);
            
            return; // 여기서 리턴하고 아래 코드는 함수로 분리
        });
    }
    
    // ===================================
    // Send Photo Data to Google Sheets (Helper Function)
    // ===================================
    function sendPhotoToGoogleSheets(formData) {
        const submitBtn = photoUploadForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // 전송 버튼 비활성화 (중복 제출 방지)
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 사진 업로드 중...';
        
        // Google Sheets로 전송
        if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // CORS 우회 (필수)
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(function() {
                // no-cors 모드에서는 응답 확인 불가능 (정상 작동으로 간주)
                console.log('✅ 사진이 Google Drive에 업로드되었습니다:', {
                    phone: formData.phone,
                    fileName: formData.fileName,
                    fileSize: formData.fileSize
                });
                
                // 성공 알림
                alert('사진이 성공적으로 전송되었습니다!\n\n24시간 내에 전문가가 연락드리겠습니다.');
                
                // 폼 초기화
                photoUploadForm.reset();
                previewImage.src = '';
                filePreview.style.display = 'none';
                fileUploadBtn.style.display = 'flex';
                
                // 버튼 복구
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Google Analytics 이벤트
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'photo_upload', {
                        'event_category': 'Contact',
                        'event_label': 'Rooftop Photo Upload with Drive'
                    });
                }
            })
            .catch(function(error) {
                console.error('❌ 전송 오류:', error);
                alert('전송에 실패했습니다.\n\n전화로 문의해주세요:\n061-337-9902 또는 010-6638-9902');
                
                // 버튼 복구
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
        } else {
            // Google Script URL이 설정되지 않은 경우
            console.warn('⚠️ Google Script URL이 설정되지 않았습니다.');
            console.log('📋 사진 업로드 데이터:', {
                phone: formData.phone,
                fileName: formData.fileName,
                fileSize: formData.fileSize
            });
            alert('시스템 설정이 완료되지 않았습니다.\n\nGOOGLE_SHEETS_SETUP.md 파일을 참조하여\nGoogle Apps Script URL을 설정해주세요.\n\n또는 전화로 문의해주세요: 061-337-9902');
            
            // 버튼 복구
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }
    
    // ===================================
    // Satisfaction Chart Animation
    // ===================================
    const satisfactionCards = document.querySelectorAll('.satisfaction-card');
    const satisfactionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('chart-animated')) {
                entry.target.classList.add('chart-animated');
                
                // Animate the circular chart
                const circle = entry.target.querySelector('.circle');
                if (circle) {
                    const dashArray = circle.getAttribute('stroke-dasharray');
                    const progress = parseInt(dashArray.split(',')[0]);
                    
                    circle.style.strokeDasharray = '0 100';
                    
                    setTimeout(function() {
                        circle.style.transition = 'stroke-dasharray 1.5s ease-out';
                        circle.style.strokeDasharray = dashArray;
                    }, 100);
                }
                
                // Animate the chart number
                const chartNumber = entry.target.querySelector('.chart-number');
                if (chartNumber) {
                    const targetText = chartNumber.textContent;
                    const targetNumber = parseFloat(targetText);
                    
                    if (!isNaN(targetNumber)) {
                        let currentNumber = 0;
                        const increment = targetNumber / 60; // 60 frames for 1 second animation
                        
                        chartNumber.textContent = '0';
                        
                        const numberInterval = setInterval(function() {
                            currentNumber += increment;
                            if (currentNumber >= targetNumber) {
                                currentNumber = targetNumber;
                                clearInterval(numberInterval);
                            }
                            
                            // Format number (keep decimal for ratings)
                            if (targetText.includes('.')) {
                                chartNumber.textContent = currentNumber.toFixed(1);
                            } else {
                                chartNumber.textContent = Math.floor(currentNumber);
                            }
                        }, 16);
                    }
                }
            }
        });
    }, { threshold: 0.3 });
    
    satisfactionCards.forEach(card => satisfactionObserver.observe(card));
    
    // ===================================
    // Review Cards Animation
    // ===================================
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    });
    
    const reviewObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    reviewCards.forEach(card => reviewObserver.observe(card));
    
    // ===================================
    // ROI Calculator
    // ===================================
    const electricBillRange = document.getElementById('electricBillRange');
    const billOutput = document.getElementById('billOutput');
    const roiYears = document.getElementById('roiYears');
    const estimatedCapacity = document.getElementById('estimatedCapacity');
    const annualSavings = document.getElementById('annualSavings');
    const totalProfit = document.getElementById('totalProfit');
    const timelineInvestment = document.getElementById('timelineInvestment');
    const timelineSegmentInvestment = document.querySelector('.timeline-segment.investment');
    const timelineSegmentProfit = document.querySelector('.timeline-segment.profit');
    
    if (electricBillRange) {
        // Initial calculation
        calculateROI(electricBillRange.value);
        
        // Update on slider change
        electricBillRange.addEventListener('input', function(e) {
            const value = parseInt(e.target.value);
            calculateROI(value);
        });
    }
    
    function calculateROI(monthlyBill) {
        // Validate input
        monthlyBill = parseInt(monthlyBill);
        if (isNaN(monthlyBill) || monthlyBill < 50 || monthlyBill > 1000) {
            return;
        }
        
        // Update output display
        if (billOutput) {
            billOutput.textContent = monthlyBill + '만원';
        }
        
        // Calculate annual bill (in 만원)
        const annualBill = monthlyBill * 12;
        
        // Estimate installation capacity based on monthly bill
        // 더 현실적인 계산: 전기요금에 따라 적절한 설치 용량 추정
        let estimatedkW;
        if (monthlyBill <= 100) {
            // 소규모: 월 50만원 = 30kW, 월 100만원 = 50kW
            estimatedkW = Math.round((monthlyBill * 0.5 + 5) / 5) * 5;
        } else if (monthlyBill <= 300) {
            // 중규모: 월 150만원 = 70kW, 월 200만원 = 90kW, 월 300만원 = 130kW
            estimatedkW = Math.round((monthlyBill * 0.4 + 10) / 10) * 10;
        } else if (monthlyBill <= 600) {
            // 대규모: 월 400만원 = 170kW, 월 500만원 = 210kW
            estimatedkW = Math.round((monthlyBill * 0.38 + 20) / 10) * 10;
        } else {
            // 초대규모: 월 800만원 = 300kW, 월 1000만원 = 370kW
            estimatedkW = Math.round((monthlyBill * 0.35 + 50) / 10) * 10;
        }
        
        // Minimum 25kW
        estimatedkW = Math.max(25, estimatedkW);
        if (estimatedCapacity) {
            estimatedCapacity.textContent = estimatedkW + 'kW';
        }
        
        // Calculate annual savings (약 80% 절감으로 고정)
        // 모든 규모에서 일정한 절감률 적용
        const savingsRate = 0.80; // 80% 고정
        
        const savings = Math.round(annualBill * savingsRate);
        if (annualSavings) {
            annualSavings.textContent = savings.toLocaleString('ko-KR') + '만원';
        }
        
        // Calculate investment cost (2024년 실제 시장 가격 기준)
        // 태양광 설치 비용: 자재비 + 공사비 + 인허가 포함
        let costPerKw;
        if (estimatedkW <= 30) {
            costPerKw = 200; // 소규모 (30kW 이하) - 단가가 매우 높음
        } else if (estimatedkW <= 50) {
            costPerKw = 185; // 소규모 (50kW 이하) - 높은 단가
        } else if (estimatedkW <= 100) {
            costPerKw = 170; // 중규모 (100kW 이하) - 표준 단가
        } else if (estimatedkW <= 200) {
            costPerKw = 160; // 대규모 (200kW 이하) - 약간 할인
        } else if (estimatedkW <= 300) {
            costPerKw = 155; // 초대규모 (300kW 이하) - 스케일 효과
        } else {
            costPerKw = 150; // 메가규모 (300kW 초과) - 최대 스케일 효과
        }
        
        const investmentCost = Math.round(estimatedkW * costPerKw); // in 만원
        
        // Calculate ROI period range based on monthly bill
        // 범위로 표시하여 더 신뢰감 있고 현실적으로 표현
        let roiMin, roiMax, roiAvg;
        
        if (monthlyBill <= 100) {
            // 소규모: 11~13년
            roiMin = 11;
            roiMax = 13;
        } else if (monthlyBill <= 200) {
            // 중소규모: 9~11년
            roiMin = 9;
            roiMax = 11;
        } else if (monthlyBill <= 350) {
            // 중규모: 7~9년
            roiMin = 7;
            roiMax = 9;
        } else if (monthlyBill <= 550) {
            // 중대규모: 6~8년
            roiMin = 6;
            roiMax = 8;
        } else if (monthlyBill <= 750) {
            // 대규모: 5~7년
            roiMin = 5;
            roiMax = 7;
        } else {
            // 초대규모: 5~6년
            roiMin = 5;
            roiMax = 6;
        }
        
        roiAvg = (roiMin + roiMax) / 2;
        
        if (roiYears) {
            roiYears.textContent = roiMin + '~' + roiMax;
        }
        if (timelineInvestment) {
            timelineInvestment.textContent = roiMin + '~' + roiMax + '년';
        }
        
        // Calculate total profit after 20 years (평균 ROI 기준)
        const totalYears = 20;
        const profitYears = totalYears - roiAvg;
        const totalSavings = savings * profitYears; // in 만원
        const profit = Math.round(totalSavings / 10000 * 10) / 10; // Convert to 억원 (소수점 1자리)
        
        if (totalProfit) {
            totalProfit.textContent = '약 ' + profit.toLocaleString('ko-KR') + '억원';
        }
        
        // Update timeline bar (평균 ROI 기준)
        const investmentPercent = (roiAvg / totalYears) * 100;
        const profitPercent = 100 - investmentPercent;
        
        if (timelineSegmentInvestment && timelineSegmentProfit) {
            timelineSegmentInvestment.style.width = investmentPercent + '%';
            timelineSegmentProfit.style.width = profitPercent + '%';
            const profitYearsElement = timelineSegmentProfit.querySelector('.segment-years');
            if (profitYearsElement) {
                profitYearsElement.textContent = profitYears.toFixed(1) + '년';
            }
        }
        
        // Debug log
        console.log('ROI Calculation:', {
            monthlyBill: monthlyBill,
            estimatedkW: estimatedkW,
            savings: savings,
            investmentCost: investmentCost,
            roiRange: roiMin + '~' + roiMax + '년',
            roiAverage: roiAvg
        });
    }
    
    // ===================================
    // Bill Comparison Animation
    // ===================================
    const billCards = document.querySelectorAll('.bill-card');
    const billObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.classList.contains('bill-animated')) {
                entry.target.classList.add('bill-animated');
                
                setTimeout(function() {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });
    
    billCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        billObserver.observe(card);
    });
    
    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c 솔라코어 (Solacore)', 'color: #FF6B35; font-size: 24px; font-weight: bold;');
    console.log('%c 노는 옥상 돈 벌게 해드려요 - 태양광 발전 전문', 'color: #2C3E50; font-size: 14px;');
    console.log('%c 📞 상담문의: 061-337-9902 / 010-6638-9902', 'color: #FFB800; font-size: 14px;');
    
});

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format Korean Won currency
function formatCurrency(amount) {
    return amount.toLocaleString('ko-KR') + '원';
}

// Validate Korean phone number
function isValidKoreanPhone(phone) {
    const cleaned = phone.replace(/[^0-9]/g, '');
    const regex = /^(01[0-9])([0-9]{3,4})([0-9]{4})$/;
    return regex.test(cleaned);
}

// Get query parameter from URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// ===================================
// Export functions for external use
// ===================================
window.Solacore = {
    formatCurrency,
    isValidKoreanPhone,
    getQueryParam
};