---
theme: vuepress
highlight: vs2015
---
> **git官网**：[Git - Reference (git-scm.com)](https://git-scm.com/docs)   
> **gitignore忽略模板**：[gitignore/Node.gitignore at main · github/gitignore · GitHub](https://github.com/github/gitignore/blob/main/Node.gitignore)

# client

git官网内downloads下clients，前二是`githubDesktop`和`sourcetree`

# 版本号

每次提交会有一个**版本号**，也叫**提交码**。是由40个16进制的数字组成。

# 分支

- 每个人一个自己的分支可以解决频繁冲突的问题

- 项目中每一个需求编号就创建一个新的分支，在`releas`上线时，不仅可以**merge分支责任明确**，万一**生产出现紧急bug且多人开发同一页面**，排查问题迅速

# README

推荐不断更新，跟随代码内容

# .gitignore
指定不追踪的文件列表。
> 编写模式：
> - 空白行不匹配任何文件，为增加可读性合理使用空白行
> - `#`为注释，可`\`转义
> - `!`为excluded,不包含字符后的文件匹配。可`\`转义
> - `/`目录的分隔符
>    - 放在最后则只匹配目录。`dir1/`只会匹配dir1目录，不会匹配`dir1`文件
> - `*`表示任意**一些**字符
> - `?`表示任意**一个**字符
> - `**`连续星号：
>    - 放在带斜杠的目录前，表示在所有目录中匹配。`**/foo/bar`
>    - `/**` 特定目录下的所有文件
>    - `a/**/b` 表示匹配a下**0或者多层级**只要有b，就忽略。

# 版本号

- 是使用`SHA-1`加密算法，且有40位。

- 有定位仓库文件作用： 使用**2 + 38**，前两位作为文件夹，后38位作为文件名

- `git cat-file -p <commit>`查看提交的文件

# 分支

HEAD，指向分支，分支指向最新的提交信息

# 指令

## 仓库操作

| 操作 | 命令 |
| --- | --- |
| **本地初始化一个仓库** | `git init` |
| **初始化与远程仓库关联** | `git remote add origin <remote-name>` |
| **克隆并命名本地文件夹名** | `git clone <http address> <local-dir-name>` |
| **配置用户名** | `git config user.name <value>` |
| **配置邮箱** | `git config user.email <value>` |
| **全局配置** | `git config --global ...` |


## 文件操作

| 操作 | 命令 |
| --- | --- |
| **查看文件状态** | `git status` |
| **查看所有版本信息(包含了本地分支执行的所有命令， 如revert但又撤回等)** | `git reflog -v` |
| **查看提交记录/一行显示** | `git log --oneline` |
| **恢复误删文件** | `git restore xx.js` |

## 分支操作

### 查询/更新操作

| 操作 | 命令 |
| :--- | :---: |
| **查看**本地签出所有分支 | `git branch -v` |
| **查看**本地对远程分支的引用 | `git branch -r` |
| **拉取**一个更新到当前分支 | `git cherry-pick <commit>` |
| **创建**并签出 | `git checkout -b <branch-name>` |
| **修剪**本地对远程分支引用(远程分支已被**删除**) | `git remote prune origin` |
| **更新并修剪**本地对远程分支引用(远程分支已被**删除**) | `git fetch --prune origin` |

### 删除操作

| 操作 | 命令 |
| :--- | :---: |
| **删除**本地的分支 | `git branch -d <branch-name>` |
| **删除**未merge的分支 | `git branch -D <branch-name>` |
| **删除远程分支** | `git push origin --delete <branch-name>` |
| **修剪**本地对远程分支引用(远程分支已被**删除**) | `git remote prune origin` |
| **更新并修剪**本地对远程分支引用(远程分支已被**删除**) | `git fetch --prune origin` |

### 修改操作

| 操作 | 命令 |
| :--- | :---: |
| **修改**提交信息 | `git commit --amend` |
| **重置到某次提交并扔掉修改** | `git reset --hard <commit>` |
| **重置到某次提交修改保留在工作区** | `git reset --soft <commit>` |
| **版本还原到参数** | `git revert <commit>` |

### 暂存操作

| 操作 | 命令 |
| :--- | :---: |
| **保存**当前进度 | `git stash [save 'someMessage']` |
| **查看保存**列表 | `git stash list` |
| **应用保存的**进度 | `git stash apply <stash-id>` |
| **丢弃保存的**进度 | `git stash drop <stash-id>` |
| **应用同时丢弃**上一次的进度 | `git stash pop` |
| **全部丢弃**进度 | `git stash clear` |

### 对比操作

| 操作 | 命令 |
| :--- | :---: |
| **对比**两个分支区别 | `git diff <branch-name>...<branch-name>` |

## 标签操作

`git tag <tags-name> <commit>`给提交创建一个标签。`-d`参数删除标签。

> 不可重复

# 提交规范

commit提交时为了方便分辨代码提交内容，需要写入message, message也有一套通用的前缀: 

| 前缀 | 命令 |
| --- | --- |
| feat  | 新功能 feature |
| fix | 修复 bug |
| docs | 文档注释 |
| style | 代码格式(不影响代码运行的变动) |
| refactor   | 重构、优化(既不增加新功能，也不是修复bug) |
| perf | 性能优化 |
| test | 增加测试 |
| chore | 构建过程或辅助工具的变动 |
| revert | 回退 |
| build | 打包 |

# ssh

`ssh-keygen -t rsa <remote url>` 生成ssh密钥

# 小菜鸡的项目日常

## 入职

在入职，拿到公司代码库的权限后:

- 首先就是需要`clone`代码下来，获取公司源代码。
    - 如果是新电脑则需要下载`git`,并`config`账号密码(`~/.gitconfig`文件下配置也可)
- 其次是查看所有的分支`branch`。
    - 询问下是在`develop`开发？还是自己从`master`新拉分支操作？(根据公司开发小组的习惯和规定)
- 这时候我们的代码一般都是master, 需要签出或创建其他分支`checkout`。 成功后**安装依赖**、配置文件等开始开发
- 第一天改改bug练练手后，则需要暂存代码(一个功能`commit`一次)，有：**防止代码丢失**、**后续溯源**等作用
- 下班啦！需要把本地代码提交到远程仓库，表明自己的kpi！在提交之前，需要`pull`拉取远程代码(自己创建的除外)，然后执行`commit、push`操作(有冲突则使用工具执行`merge`操作)

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

在工作中，对远程分支的引用`origin/test`等非常多，假设在云效等代码管理平台上，删除了远程分支，但是本地git还是默认会保留数据，可以执行：

```bash
# 修剪prune远程不存在的引用
git remote prune origin
```

## 临时需要切分支

可能有以下情况：
1. 本来自己头戴耳机、嘎嘎操作，沉浸在自己的代码世界，但是由于紧急bug、需求变更、协查uat问题等，需要临时切换分支。

1. 兼职项目使用同一分支，突然告知代码修改了组件attrs，需要临时pull代码。

但是由于不想commit到暂存区！怎么整？？可以执行：

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

---

**可能会存在stash一次，切分支，回来又要修改了代码又要stash切分支，怎么操作？**

```bash
# 保存一次
git stash save 'first'
# 保存两次
git stash save 'second'
# 查看stash列表
git stash list
# 逐条应用
git stash apply [first-id]
git stash apply [second-id]
# 删掉stash条目
git stash drop [first-id]
# 全部清除
git stash clear
```

---

**需要临时pull代码情况下：**
```bash
# ...写代码中，告知需要pull
git pull
# pull代码报错，不允许未提交就pull，执行以下：
git stash
git pull
git stash pop
```

## 版本回退/版本切换

1. 写的代码突然需要被重置到之前的某次提交

1. release灰度版本合并了某分支，但是存在重大风险需要回退到某次合并记录

1. 在master分支写入代码并提交、push后，需要回退、重置代码等

以上情况不常见但是很实用。 总结下防止脑子抽抽了突然忘了。

版本回退有`revert`和`reset`两种。

---

**reset操作**：   

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

