# path模块

路径模块。


| api                      | 描述                             | 返回值                                   |
|--------------------------|----------------------------------|------------------------------------------|
| `path.resolve(...paths)` | 拼接参数为规范路径(转义`/`和`\`) | 拼接好的规范路径                         |
| `path.sep`               | 路径中的分隔符                   | windows为`\` linux为`/`                  |
| `path.parse(path)`       | 解析路径                         | 对象，包含了根目录、扩展名、文件名等信息 |
| `path.basename(path)`    | 路径基础名称                     | 当前文件的父级目录名称                   |
| `path.dirname(path)`     | 目录名称                         | `__dirname`                              |
| `path.extname(path)`     | 扩展名                           | `.js`等                                  |
