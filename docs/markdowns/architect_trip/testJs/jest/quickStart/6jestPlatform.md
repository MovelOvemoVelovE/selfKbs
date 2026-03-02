jest内有很多内置的核心模块， 可以选择他们并当作独立包来使用，都是很有用的包

## jest-Changed-files

识别 `git/hg` 存储库中已修改文件的工具。 导出两个函数： 

- `getChangedFilesForRoots`： 返回promise， 解析为包含已更改文件和存储库的对象

- `findRepos`： 返回promise， 解析为包含存储库的数组
