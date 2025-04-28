module.exports = {
  // 在语句末尾添加分号
  semi: false, // 默认值为 true，设置为 false 时将省略分号

  // 使用单引号代替双引号
  singleQuote: true, // 默认值为 false，设置为 true 时字符串将使用单引号

  // 指定每一级缩进的空格数
  tabWidth: 2, // 默认值为 2，设置为 4 时每一级缩进将使用 4 个空格

  // 使用空格而不是制表符进行缩进
  useTabs: false, // 默认值为 false，设置为 true 时将使用制表符进行缩进

  // 在多行对象或数组的最后一个元素后添加逗号
  trailingComma: 'es5', // 可选值为 'none'（无逗号）、'es5'（ES5 兼容的逗号）、'all'（所有可能的地方都添加逗号）

  // 每行的最大字符数，超出后会自动换行
  printWidth: 80, // 默认值为 80，设置为更大的值可以减少换行

  // 箭头函数的参数总是使用括号
  arrowParens: 'avoid', // 可选值为 'always'（总是添加括号）、'avoid'（仅在必要时添加括号）

  // 指定文件的换行符
  endOfLine: 'lf', // 可选值为 'lf'（换行符 \n）、'crlf'（回车换行符 \r\n）、'cr'（回车符 \r）、'auto'（根据文件内容自动检测）

  // 在 JSX 中使用单引号代替双引号
  jsxSingleQuote: true, // 默认值为 false

  // 在对象字面量中使用逗号分隔属性
  objectWrap: preserve, // 默认值为 preserve， collapse对象尽可能地折叠

  // 标签闭合时是否将结束标签放在同一行
  bracketSameLine: false, // 默认值为 false，设置为 true 时将把结束标签放在同一行

  
};