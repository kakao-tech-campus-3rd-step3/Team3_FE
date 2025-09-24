#!/bin/bash

echo "🔧 Pre-build 작업 시작..."

# 의존성 설치
echo "📦 의존성 설치 중..."
npm ci

# 코드 품질 검사
echo "🔍 코드 품질 검사 중..."
npm run lint

# 코드 포맷 검사
echo "✨ 코드 포맷 검사 중..."
npm run format:check

# 타입 체크
echo "📝 타입 체크 중..."
npx tsc --noEmit

# 환경 변수 검증
echo "🌍 환경 변수 검증 중..."
if [ -z "$EXPO_PUBLIC_API_BASE_URL" ]; then
  echo "⚠️  EXPO_PUBLIC_API_BASE_URL이 설정되지 않았습니다."
fi

if [ -z "$EXPO_PUBLIC_ENVIRONMENT" ]; then
  echo "⚠️  EXPO_PUBLIC_ENVIRONMENT가 설정되지 않았습니다."
fi

echo "✅ Pre-build 작업 완료!"
