---
theme: vuepress
highlight: vs2015
---

> **gitignore 常用模板**：[.gitignore](/markdowns//configJs#gitignore)

# 可视化工具

官网 downloads 排名前二是`githubDesktop`和`sourcetree`

# 版本号

每次提交会有一个**版本号**，也叫**提交码**。是由 40 个 16 进制的数字组成。

::: tip 了解版本号

- 是使用`SHA-1`加密算法，且有 40 位。

- 有定位仓库文件作用： 使用**2 + 38**，前两位作为文件夹，后 38 位作为文件名

- `git cat-file -p <commit>`查看提交的文件

:::

# 分支

- 每个人一个分支可以解决频繁冲突

- 项目需求编号对应一个分支，在`release`，**merge 分支责任明确**。

# .gitignore

指定不追踪的文件列表。

> - 空白行不匹配任何文件，为增加可读性合理使用空白行
> - `#`为注释，可`\`转义
> - `!`为 excluded,不包含字符后的文件匹配。可`\`转义
> - `/`目录的分隔符
>   - 放在最后则只匹配目录。`dir1/`只会匹配 dir1 目录，不会匹配`dir1`文件
> - `*`表示任意**一些**字符
> - `?`表示任意**一个**字符
> - `**`连续星号：
>   - 放在带斜杠的目录前，表示在所有目录中匹配。`**/foo/bar`
>   - `/**` 特定目录下的所有文件
>   - `a/**/b` 表示匹配 a 下**0 或者多层级**只要有 b，就忽略。

# 指令

## 仓库操作

| 操作                       | 命令                                            |
| -------------------------- | ----------------------------------------------- |
| **初始化**                 | `git init`                                      |
| **与远程仓库关联**         | `git remote add origin <remote-name>`           |
| **与第二个远程仓库关联**   | `git remote add second <remote-name>`           |
| **克隆并命名本地文件夹名** | `git clone <git-address> <local-dir-name>`      |
| **配置用户名 邮箱 密码**   | `git config user.[name/email/password] <value>` |

## 文件操作

| 操作                                         | 命令                |
| -------------------------------------------- | ------------------- |
| **查看状态**                                 | `git status`        |
| **查看所有版本信息(本地分支执行的所有命令)** | `git reflog -v`     |
| **查看提交记录/一行显示**                    | `git log --oneline` |
| **恢复误删文件**                             | `git restore xx.js` |

## 分支操作

### 查询/更新操作

| 操作                         |              命令               |
| :--------------------------- | :-----------------------------: |
| **查看**本地签出所有分支     |         `git branch -v`         |
| **查看**本地对远程分支的引用 |         `git branch -r`         |
| **拉取**一个提交到当前分支   |   `git cherry-pick <commit>`    |
| **创建并签出**               | `git checkout -b <branch-name>` |

### 删除操作

| 操作                                                   |                   命令                   |
| :----------------------------------------------------- | :--------------------------------------: |
| **删除**本地的分支                                     |      `git branch -d <branch-name>`       |
| **删除**未 merge 的分支                                |      `git branch -D <branch-name>`       |
| **删除远程分支**                                       | `git push origin --delete <branch-name>` |
| **修剪**本地对远程分支引用(远程分支已被**删除**)       |        `git remote prune origin`         |
| **更新并修剪**本地对远程分支引用(远程分支已被**删除**) |        `git fetch --prune origin`        |

### 修改操作

| 操作                               |            命令             |
| :--------------------------------- | :-------------------------: |
| **修改**提交信息                   |    `git commit --amend`     |
| **重置到某次提交并扔掉修改**       | `git reset --hard <commit>` |
| **重置到某次提交修改保留在工作区** | `git reset --soft <commit>` |
| **版本还原到参数**                 |    `git revert <commit>`    |
| **合并分支**                       |  `git merge <branch-name>`  |

### 暂存操作

| 操作                         |             命令             |
| :--------------------------- | :--------------------------: |
| **保存**当前进度             | `git stash <stash-message>`  |
| **查看保存**列表             |       `git stash list`       |
| **应用保存的**进度           | `git stash apply <stash-id>` |
| **丢弃保存的**进度           | `git stash drop <stash-id>`  |
| **stash 栈弹出**上一次的进度 |       `git stash pop`        |
| **全部丢弃**进度             |      `git stash clear`       |

### 对比操作

| 操作                 |                   命令                   |
| :------------------- | :--------------------------------------: |
| **对比**两个分支区别 | `git diff <branch-name>...<branch-name>` |

## 标签操作

`git tag <tags-name> <commit>`给提交创建一个标签。`-d`参数删除标签。

::: danger 注意

标签不可重复

:::

# 提交规范

commit 提交时为了方便分辨代码提交内容，需要写入 message, message 也有一套通用的前缀:

| 前缀       | 命令                                       |
| ---------- | ------------------------------------------ |
| `feat `    | 新功能 feature                             |
| `fix`      | 修复 bug                                   |
| `docs`     | 文档注释                                   |
| `style`    | 代码格式(不影响代码运行的变动)             |
| `refactor` | 重构、优化(既不增加新功能，也不是修复 bug) |
| `perf`     | 性能优化                                   |
| `test`     | 增加测试                                   |
| `chore`    | 构建过程或辅助工具的变动                   |
| `revert`   | 回退                                       |
| `build`    | 打包                                       |

# ssh

`ssh-keygen -t rsa <remote url>` 生成 ssh 密钥

# 小菜鸡的项目日常

## 入职

- `clone`代码下来，获取公司源代码。
  - 新电脑下载`git`,并`config`账号密码(`~/.gitconfig`文件下配置也可)
- 查看所有的分支`branch`。
  - `develop`开发？还是`master`新拉分支操作？
- 签出或创建其他分支`checkout`
- 改改 bug 后，暂存代码(一个功能`commit`一次)
- 下班啦！代码提交到远程仓库，表明自己的 kpi！
  - `pull`拉取远程代码
  - `commit、push`操作
  - 有冲突则使用工具执行`merge`

---

### 总结如下：

```bash
# 获取源代码
git clone https:aliyun.com/78172y831/projectName.git
# 查看分支
git branch
git branch -v // 详细查看当前分支 及 最新的commit message
# 切换并创建分支 只切换的话取消 -b 的选项
git checkout -b myGitHead
# 修改并想要提交文件
git add .
git commit -m '第一次提交'
# 推送远程库
git pull // 确保包含最新的远程分支内容
git push origin // 推送远程库
```

## 本地远程分支过多

```bash
# 修剪prune远程不存在的引用
git remote prune origin
```

## 临时需要切分支

可能有以下情况：

1. 头戴耳机、嘎嘎操作! 但是由于紧急问题等，需要临时切换分支。
2. commit 会留痕! 导致 message 混乱

```bash
# 保存进度
git stash save '代码暂存'
# 切换分支
git checkout otherDev
# 切换回来
git checkout myDev
# 保存修改恢复出来，并删除stash条目
git stash pop
```

## 版本回退/版本切换

1. 写的代码突然需要被重置到之前的某次提交

1. `release`灰度版本合并了某分支，但存在风险需回退到某次合并记录

2. `master` 分支写入代码并提交、push 后，需要回退、重置代码

**reset 操作**：

```bash
# 查看提交记录(进入到vim模式， 按q回退出来)
git log --oneline
# 复制各个版本的commit-id，查看不同提交的不同文件状态
git reset <commit-id>
# 想要放弃重置操作，继续工作
git reflog # 找到以下HEAD信息
# 0369977 (origin/master) HEAD@{1}: reset: moving to 0369977
git reset <0369977>
# 至此结束reset版本穿梭。
--------------------------------------------
# 如果想要完全还原到那次状态，譬如vue想在那次提交时看看bug存在不存在
git reset --hard <commit-id>
# 还原文件到最新状态：
git pull
# 想要彻底重置，放弃那次提交之后的所有代码
# 当然 git reflog照样可以帮你找回！别搞事别用~reflog会定期清理记录的
git push -f origin <branch-name>
```
