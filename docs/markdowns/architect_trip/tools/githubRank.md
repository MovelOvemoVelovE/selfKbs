# GitHub 排行榜

GitHub 提供了多种方式查找热门仓库与开发者排行榜，帮助我们发现优秀的开源项目和技术趋势。

## GitHub Trending（趋势榜）

[GitHub Trending](https://github.com/trending) 是官方提供的热门仓库榜单，按照**一天、一周、一月**的时间维度展示当前最受欢迎的仓库和开发者。

### 按语言筛选

在趋势榜页面可以按编程语言过滤，例如只查看 JavaScript 热门仓库：

```
https://github.com/trending/javascript
```

或者通过 `?since=` 参数指定时间范围：

```
https://github.com/trending/javascript?since=weekly
https://github.com/trending/javascript?since=monthly
```

### 查看热门开发者

```
https://github.com/trending/developers
https://github.com/trending/developers/javascript?since=weekly
```

## GitHub Search（搜索排序）

通过 GitHub 搜索功能配合排序，可以更灵活地查找高质量仓库。

### 按 Star 数排序

```
https://github.com/search?q=vue&sort=stars&order=desc
```

### 高级搜索语法

| 关键字                     | 说明                                 | 示例                                        |
| -------------------------- | ------------------------------------ | ------------------------------------------- |
| `stars:>n`                 | Star 数大于 n                        | `stars:>10000`                              |
| `forks:>n`                 | Fork 数大于 n                        | `forks:>1000`                               |
| `language:xxx`             | 按编程语言筛选                       | `language:javascript`                       |
| `topic:xxx`                | 按话题标签筛选                       | `topic:vue`                                 |
| `pushed:>YYYY-MM-DD`       | 最近推送时间晚于某日期               | `pushed:>2024-01-01`                        |
| `created:>YYYY-MM-DD`      | 创建时间晚于某日期                   | `created:>2023-01-01`                       |
| `in:name`                  | 仓库名称包含关键字                   | `react in:name`                             |
| `in:description`           | 仓库描述包含关键字                   | `admin dashboard in:description`            |
| `in:readme`                | README 中包含关键字                  | `awesome in:readme`                         |

**综合示例**：查找近一年 Star 数大于 5000 的 Vue 相关仓库：

```
language:javascript topic:vue stars:>5000 pushed:>2024-01-01
```

## 第三方排行榜工具

| 工具                                                               | 说明                                                    |
| ------------------------------------------------------------------ | ------------------------------------------------------- |
| [GitHubRankings](https://githubrankings.com)                       | 按国家/地区筛选开发者及仓库排名                         |
| [OSS Insight](https://ossinsight.io)                               | 基于 GitHub 数据的深度分析，含仓库对比、技术趋势等      |
| [Star History](https://star-history.com)                           | 可视化对比多个仓库的 Star 增长曲线                      |
| [Awesome Lists](https://github.com/sindresorhus/awesome)           | 社区维护的各技术领域精选仓库合集                        |

::: tip 小技巧

- GitHub Trending 每天更新，适合快速了解当天热点
- 搜索时加上 `NOT is:archived` 可过滤掉已归档的仓库
- 加上 `license:mit` 可筛选 MIT 协议的开源项目

:::
