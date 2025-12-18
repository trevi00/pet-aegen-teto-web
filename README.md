# 반려동물 에겐 vs 테토 성격 분석 서비스

반려동물 사진을 AI로 분석하여 에겐(Aegen) 또는 테토(Teto) 성격 유형을 판별하는 웹 서비스입니다.

## 소개

### 에겐(Aegen)이란?
- 차분하고 신중한 성격
- 상황을 관찰하고 천천히 행동함
- 낯선 환경에서 조심스러운 태도
- 독립적이고 자기만의 공간을 중시

### 테토(Teto)란?
- 활발하고 적극적인 성격
- 호기심이 많고 탐험을 즐김
- 새로운 것에 빠르게 반응
- 사교적이고 관심받는 것을 좋아함

## 기술 스택

- Frontend: React 19, TypeScript, Vite
- Styling: Tailwind CSS
- Routing: React Router DOM v7
- HTTP Client: Axios
- Deployment: Docker, Nginx

## 설치 및 실행

### 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 로컬 개발 환경

1. 저장소 클론
```bash
git clone https://github.com/YOUR_USERNAME/pet-aegen-teto-web.git
cd pet-aegen-teto-web
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
```bash
cp .env.example .env
```

`.env` 파일을 열고 백엔드 API URL을 설정합니다:
```
VITE_API_URL=http://localhost:8000
```

4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

### 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

### Docker 배포

```bash
docker build -t pet-aegen-teto-web .
docker run -p 80:80 pet-aegen-teto-web
```

## 프로젝트 구조

```
src/
├── components/       # 재사용 가능한 컴포넌트
│   ├── AdBanner.tsx     # 광고 배너
│   ├── AdLayout.tsx     # 광고 레이아웃
│   ├── AdSense.tsx      # 애드센스 컴포넌트
│   └── Footer.tsx       # 푸터
├── constants/        # 상수 정의
├── pages/            # 페이지 컴포넌트
│   ├── HomePage.tsx     # 메인 페이지
│   ├── AnalysisPage.tsx # 분석 진행 페이지
│   ├── ResultPage.tsx   # 결과 페이지
│   ├── AboutPage.tsx    # 서비스 소개
│   ├── FaqPage.tsx      # 자주 묻는 질문
│   ├── HowToUsePage.tsx # 사용 방법
│   ├── PrivacyPage.tsx  # 개인정보처리방침
│   └── TermsPage.tsx    # 이용약관
├── services/         # API 서비스
│   └── api.ts           # 백엔드 API 통신
├── App.tsx           # 라우팅 설정
├── main.tsx          # 앱 진입점
└── index.css         # 전역 스타일
```

## 서비스 흐름도

```
┌─────────────────────────────────────────────────────────────────┐
│                         사용자 접속                              │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       HomePage (메인)                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  1. 반려동물 이름 입력                                    │    │
│  │  2. 사진 업로드 (드래그앤드롭 / 파일선택)                  │    │
│  │  3. 분석 시작 버튼 클릭                                   │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AnalysisPage (분석 중)                        │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  - 로딩 애니메이션 표시                                   │    │
│  │  - 백엔드 API로 이미지 전송 (POST /analyze)               │    │
│  │  - AI 모델이 이미지 분석 수행                             │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ResultPage (결과)                           │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  - 에겐/테토 분류 결과 표시                               │    │
│  │  - 퍼센티지 (예: 에겐 70% / 테토 30%)                     │    │
│  │  - 성격 분석 코멘트                                       │    │
│  │  - 결과 이미지 저장 기능                                  │    │
│  │  - SNS 공유 기능                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## API 명세

### 이미지 분석

```
POST /analyze
Content-Type: multipart/form-data

Request:
  - image: File (이미지 파일)

Response:
{
  "success": true,
  "classification": "aegen" | "teto",
  "aegen_percentage": 70,
  "teto_percentage": 30,
  "comment": "분석 결과 코멘트"
}
```

### 헬스 체크

```
GET /health

Response: 200 OK
```

## 트러블슈팅

### npm install 실패

증상: 의존성 설치 중 오류 발생

해결:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 개발 서버가 시작되지 않음

증상: npm run dev 실행 시 포트 충돌 오류

해결:
```bash
# 다른 포트로 실행
npm run dev -- --port 3000

# 또는 기존 프로세스 종료 후 재실행
# Windows
netstat -ano | findstr :5173
taskkill /PID [PID번호] /F

# Linux/Mac
lsof -i :5173
kill -9 [PID번호]
```

### API 연결 실패

증상: 분석 요청 시 네트워크 오류 발생

해결:
1. .env 파일의 VITE_API_URL이 올바른지 확인
2. 백엔드 서버가 실행 중인지 확인
3. CORS 설정이 올바른지 확인
4. 방화벽에서 해당 포트가 열려있는지 확인

### 이미지 업로드 실패

증상: 이미지 선택 후 업로드되지 않음

해결:
1. 이미지 파일 크기 확인 (최대 10MB 권장)
2. 지원 형식 확인 (JPG, PNG, GIF, WebP)
3. 브라우저 콘솔에서 오류 메시지 확인

### 빌드 실패

증상: npm run build 실행 시 TypeScript 오류

해결:
```bash
npx tsc --noEmit
npm run lint
```

### Docker 컨테이너 실행 실패

증상: 컨테이너가 시작 직후 종료됨

해결:
```bash
docker logs [컨테이너ID]
docker run -it pet-aegen-teto-web /bin/sh
```

### 환경 변수가 적용되지 않음

증상: 배포 환경에서 API URL이 localhost로 설정됨

해결:
1. .env.production 파일이 있는지 확인
2. Vite 환경 변수는 VITE_ 접두사 필수
3. 빌드 시점에 환경 변수가 주입되므로 빌드 전에 설정 필요

## 브라우저 지원

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
