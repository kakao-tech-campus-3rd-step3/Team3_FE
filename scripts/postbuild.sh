#!/bin/bash

echo "📦 Post-build 작업 시작..."

# 빌드 결과 확인
echo "🔍 빌드 결과 확인 중..."
if [ -d "dist" ]; then
  echo "✅ 빌드 아티팩트가 생성되었습니다."
  ls -la dist/
else
  echo "⚠️  빌드 아티팩트를 찾을 수 없습니다."
fi

# 빌드 완료 알림 (선택사항)
echo "📢 빌드가 성공적으로 완료되었습니다!"

# 임시 파일 정리
echo "🧹 임시 파일 정리 중..."
rm -rf node_modules/.cache
rm -rf .expo

echo "✅ Post-build 작업 완료!"
