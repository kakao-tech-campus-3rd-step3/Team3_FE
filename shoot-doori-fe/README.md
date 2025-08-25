# Shoot Doori FE

## 📱 프로젝트 소개

Shoot Doori 모바일 애플리케이션의 프론트엔드 프로젝트입니다.

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+
- npm 또는 yarn

## ⚙️ 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경 변수들을 설정하세요:

```bash
# API Configuration
API_BASE_URL=https://api.shootdoori.com
API_VERSION=v1

# External Services
GOOGLE_MAPS_API_KEY=your_google_maps_key_here
KAKAO_LOGIN_API_KEY=your_kakao_key_here

# Environment
ENVIRONMENT=development
DEBUG=true

# App Configuration
APP_NAME=Shoot Doori
APP_VERSION=1.0.0
```

## 🛠️ 개발 도구

- **TypeScript**: 타입 안전성을 위한 설정
- **ESLint**: 코드 품질 관리
- **Expo Router**: 파일 기반 라우팅
- **React Query**: 서버 상태 관리
- **Zustand**: 클라이언트 상태 관리

## 📝 스크립트

- `npm start`: Expo 개발 서버 시작
- `npm run ios`: iOS 시뮬레이터 실행
- `npm run android`: Android 에뮬레이터 실행
- `npm run web`: 웹 브라우저에서 실행
- `npm run lint`: ESLint로 코드 검사
