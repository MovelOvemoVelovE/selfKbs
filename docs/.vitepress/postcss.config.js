module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 设计稿的宽度（一般是 375 或 750）
      viewportHeight: 667, // 设计稿的高度（可选）
      unitPrecision: 5, // 转换后保留的小数位数
      viewportUnit: 'vw', // 转换成的视口单位，建议使用 vw
      selectorBlackList: ['.ignore', '.hairlines'], // 不转换的类名
      minPixelValue: 1, // 小于或等于 1px 不转换为视口单位
      mediaQuery: false, // 是否允许在媒体查询中转换 px
    },
  },
}; 