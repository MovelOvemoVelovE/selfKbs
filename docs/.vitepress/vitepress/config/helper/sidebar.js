/**
 * sidebar侧边栏的辅助生成函数
 * 1. 使用目录约束的方法来实现辅助
 * 2. 所有需要生成sidebar的目录必须遵循： baseFolder/oneLevel/twoLevel...
 *
 * @author kakarotto <movelovemovelove@163.com>
 */
import fs from 'fs'
import path from 'path'

function generateSidebar(sidebarModule){
  console.log(sidebarModule);
  const sidebarPath = path.join(__dirname, sidebarModule);
  const stats = fs.statSync(sidebarPath);
  console.log(stats.isFile());
  return
}

export default generateSidebar;