:::tip
高级运营中有创建套件(模块化管理)、了解`command`命令、命令行运行器等内容， 建议阅读。
:::

# IDE支持的5类命令

除了GUI(Graphical user Interface 用户图形界面)的用户傻瓜式操作， IDE通过命令行运行来在不同浏览器上快速运行测试

![commands.png](imgs/commands.png)

命令分为5大类， 分别是： 界面操作类、测试验证类、执行等待类、流程控制类、测试辅助类。

这里的命令特别多，放在本文最后的章节去查阅。

[IDE支持命令手册](./chapter3.md#ide支持命令手册)

# 测试套件管理

我们录制一条用例那是基本操作， 真实业务中我们会有2条、无数条用例。

## 1. 生成多个测试用例

我们现在有一条输入、并点击搜索的用例

![img.png](imgs/suite/multipleCase1.png)

---

我们现在增加多个测试用例： 首先复制一个并自己去录制：

![img.png](imgs/suite/multipleCase2.png)

---

然后手动增加一个并自己去录制：

![img.png](imgs/suite/multipleCase3.png)

## 2. 创建套件

假设我们现在有两个模块： 百度贴吧、百度搜图、百度搜索三个模块，那么几十几百条用例混在一起， 我们如何管理呢？

很明显我们需要一个**结构化**的管理方式， Selenium IDE提供了 **测试套件(Test Suite)** 的概念。

### 创建测试套件

![img.png](imgs/suite/suite1.png)

![img.png](imgs/suite/suite2.png)

# 命令行运行器

:::tip
命令行存在的意义是可以让IDE的所有测试运行在**所有浏览器上**

并且支持并行运行，也支持在Selenium Grid上运行。
:::

## 1. 安装并运行在各个浏览器

首先需要安装最新版nodejs, 在[nodejs官网](https://nodejs.org/en/)下载安装包并安装。

然后打开终端，安装命令运行器

`npm install -g selenium-side-runner`

安装完成后， 我们需要下载各个浏览器的驱动[详见4章节开头](./chapter4.md#安装各个浏览器驱动)。

然后跑命令:

`selenium-side-runner d:\Baidu.side`

:::tip
通过`selenium-side-runner --help`可以查看所有命令行参数。
:::

## 2. 常用参数设置

参数设置为: `selenium-side-runner -params(这是具体参数) url`

- 运行多浏览器命令 `selenium-side-runner -c "browserName=chrome" d:\Baidu.side`
- 修改基础url: `selenium-side-runner -b "baseUrl=https://www.baidu.com" d:\Baidu.side`
- 选取测试用例运行 `selenium-side-runner d:\Baidu.side --filter imageSearch`
- 并行运行测试用例 `selenium-side-runner -w 4 d:\Baidu.side`
- 测试结果导出为文件 `selenium-side-runner --output-directory d:\testReports d:\Baidu.side --output-format-junit/jest`

#### 指定配置文件

每次启动都去设置运行参数，我们可以创建一个YAML文件，填入配置参数

```yaml
capabilities:
  browserName: chrome
  browserVersion: latest
  'goog:chromeOptions':
    args:
      - headless
      - disable-gpu
      - window-size=1920,1080
```

第一种方式直接将配置文件和测试文件放在一个目录下，命名为`.side.yml`， 然后直接运行命令

第二种方式则是通过`--config-file "BaiduSearch.yml"`指定配置文件

# IDE支持命令手册

## 1. 界面操作类

界面操作类最常见的是`click`、`select`、`mouse over`等， 这些命令主要用于模拟用户在浏览器上的操作行为。

:::danger
此类命令，如果`fail on error`属性被设置为true， 则在命令执行失败时， 测试用例会立即终止， 并标记为失败。
:::

#### 浏览器窗口操作

| 命令              | 说明           | 参数设置(必须设置)                             | 备注                                                                        |
|-----------------|--------------|----------------------------------------|---------------------------------------------------------------------------|
| open            | 打开指定URL，     | Target：xx，**可以相对也可以绝对路径**              | 等待页面加载完成后才能执行下一个命令                                                        |
| set window size | 设置浏览器窗口大小    | Target：宽度 x 高度，格式为`widthxheight`       |                                                                           |
| select window   | 切换到指定的浏览器窗口  | Target为窗口名称或句柄                         |                                                                           |
| select frame    | 切换到指定的iframe | Target:id=frameId或index=0或relative=top | 如果多层嵌套框架iframe，那么需要多次执行操作， 返回页面顶部`relative=top`， 向外选择父框架`relative=parent` |
| close           | 关闭当前浏览器窗口    |                                        |                                                                           |

:::tip
to do: continue writing
等待补充
:::