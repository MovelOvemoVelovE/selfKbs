在每天繁忙的工作中，我们专注于业务的开发和项目的推进，或许每天会疏忽掉工作的具体内容。

那么作为码农，我们每开发一个功能，都会进行`git commit`提交代码来时刻存储代码。

可以写一个小的工具，将`git commit`的`message`提取出来， 方便梳理回顾每日、每周、每月的工作内容

## txt文件格式

```js
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// 目标目录（替换为你的 Git 仓库路径）
const targetDir = path.resolve('D://work space'); // 当前目录，或替换为其他路径
// 当天日期
const today = new Date().toLocaleDateString().replace(/\//g, '');
// 输出文件路径
const outputFilePath = path.resolve(__dirname, `${today}.txt`);
// Git log 命令，按作者和日期格式化输出
const gitLogCommand = `git log --pretty=format:"%an|%ad|%s" --date=format:"%Y-%m-%d"`;

exec(gitLogCommand, { cwd: targetDir }, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行出错: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`标准错误输出: ${stderr}`);
    return;
  }

  // 解析 Git 提交记录
  const commits = stdout.split('\n').map(line => {
    console.log(line)
    const [author, date, message] = line.split('|');
    return { author, date, message };
  });

  // 按作者和月份分类
  const groupedData = {};
  commits.forEach(({ author, date, message }) => {
    if (!groupedData[author]) {
      groupedData[author] = {};
    }
    if (!groupedData[author][date]) {
      groupedData[author][date] = [];
    }
    groupedData[author][date].push(message);
  });

  // 打印分类结果
  let outputContent = '按作者和月份分类的 Git 提交记录:'
  for (const author in groupedData) {
    outputContent += `\n作者: ${author}`
    for (const date in groupedData[author]) {
      outputContent += `\n\t  日期: ${date}`
      groupedData[author][date].forEach((message, index) => {
        outputContent += `\n\t    ${index + 1}. ${message}`
      });
    }
  }
  fs.writeFile(outputFilePath, outputContent, 'utf8', (err, res) => {
    if(err){
      return console.log(`🆘, 输出文件错误：${err}`)
    }
    console.log(`💥💥💥, 提交记录生成为${outputFilePath}`)
  })
});
```