/**
 * sidebar侧边栏的辅助生成函数
 * 1. 使用目录约束的方法来实现辅助
 * 2. 所有需要生成sidebar的目录必须遵循： baseFolder/oneLevel/twoLevel...
 *
 * @author kakarotto <movelovemovelove@163.com>
 */
import fs from 'fs'
import path from 'path'

function generateSidebar(sidebarModule) {
    const resultArr = {}
    const sidebarPath = path.join('docs/', sidebarModule);
    const stats = fs.statSync(sidebarPath);
    // 如果是文件夹的话生成
    if (stats.isDirectory()) {
        const targetFiles = fs.readdirSync(sidebarPath)
        targetFiles.forEach(file => {
            if (fs.statSync(path.join(sidebarPath, file)).isDirectory()) {

            } else {
                // 如果是文件那么默认是简介
                resultArr[sidebarModule + '/jest'] = [
                    {
                        text: 'jest',
                        items: [
                            {text: '简介', link: path.join(sidebarPath, file).toString()},
                        ]
                    }
                ]
            }
        })
    } else {
        throw new Error('sidebar must be directory')
    }
    console.log(resultArr)
    return resultArr
}

export default generateSidebar;