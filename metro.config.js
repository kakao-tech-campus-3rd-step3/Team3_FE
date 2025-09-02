const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// 경로 별칭 설정
config.resolver.alias = {
  '@': path.resolve(__dirname, './'),
};

module.exports = config;
