// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Metro only recognises lowercase extensions by default.
// Add uppercase variants so that .JPG / .PNG etc. are treated as assets.
config.resolver.assetExts = [
  ...config.resolver.assetExts,
  'JPG', 'JPEG', 'PNG', 'GIF', 'WEBP', 'BMP',
];

module.exports = config;

