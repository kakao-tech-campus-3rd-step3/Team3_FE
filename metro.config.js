const path = require('path');

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  '@': path.resolve(__dirname, './'),
};

module.exports = config;
