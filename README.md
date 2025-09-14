# Shoot Doori FE

## 📱 프로젝트 소개

Shoot Doori 모바일 애플리케이션의 프론트엔드 프로젝트입니다.

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+
- npm 또는 yarn

## ⚙️ 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경 변수들을 설정해주세요

```bash
# API Configuration
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000

# Environment
EXPO_PUBLIC_ENVIRONMENT=development
```

**주의사항:**

- `.env` 파일은 Git에 올라가지 않습니다
- 각 개발자가 로컬 환경에 맞게 설정해야 합니다
- 실제 배포 시에는 다른 값으로 설정됩니다

## 🛠️ 개발 도구

- **TypeScript**: 타입 안전성을 위한 설정
- **ESLint**: 코드 품질 관리
- **Expo Router**: 파일 기반 라우팅
- **React Query**: 서버 상태 관리
- **Zustand**: 클라이언트 상태 관리

## 📝 스크립트

- `npx run start`: Expo 개발 서버 시작
- `npm run lint`: ESLint로 코드 검사
- 'npm run api', 'npx expo start' : 실행
