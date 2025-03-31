/**
 * sidebar侧边栏的辅助生成函数
 * 1. 使用目录约束的方法来实现辅助
 * 2. 所有需要生成sidebar的目录必须遵循： baseFolder/oneLevel/twoLevel...
 * generateSidebar('/markdowns/architect_trip/testJs/jest')下的文件夹所有的都加上侧边栏
 * @author kakarotto <movelovemovelove@163.com>
 */
import fs from 'fs'
import path from 'path'

function generateSidebar(sidebarModule) {
  const resultArr = []
  const sidebarPath = path.join('docs/', sidebarModule);
  const stats = fs.statSync(sidebarPath);
  // 如果是文件夹的话生成
  if (stats.isDirectory()) {
    // 获取到目标文件夹的文件列表
    const targetFiles = fs.readdirSync(sidebarPath)
    // 循环获取到文件列表 [index.md, xxx文件夹]
    targetFiles.forEach(file => {
      // 是否为文件夹
      if (fs.statSync(path.join(sidebarPath, file)).isDirectory()) {
        const childFiles = fs.readdirSync(path.join(sidebarPath, file))
        resultArr.push({
            text: file,
            collapsed: false,
            items: childFiles.map(itemChildFile => {
              return {
                text: itemChildFile.replace('.md', '').substring(1),
                link: `${sidebarModule}/${file}/${itemChildFile}`
              }
            })
          })
      } else {
        let fileNameAndSuffix = file.split('.')
        // 如果是文件那么默认是简介 也就是entry
        resultArr.unshift({
            text: `💌${fileNameAndSuffix[0]}`,
            collapsed: false,
            items: [
              { text: '简介', link: path.join(sidebarModule, file).toString() },
            ]
          })
      }
    })
  } else {
    throw new Error('sidebar config must be directory')
  }
  return {
    [sidebarModule]: resultArr
  }
}

export default generateSidebar;