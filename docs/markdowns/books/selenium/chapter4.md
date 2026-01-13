selenium通过WebDriver支持**各种浏览器**的自动化测试, 他是一种**API**和**协议**， 定义了一种不依赖于编程语言的、用于控制浏览器行为的
**接口**。

我们使用具体语言(python、java、c#等)绑定的库(对于C#是dll，对于java来说是jar)来调用接口。

每种浏览器都有基于WebDriver协议实现的**浏览器驱动程序**， 这些驱动程序充当浏览器和Selenium之间的桥梁。

![img.png](imgs/webdriver/webdriver1.png)

# 下载浏览器的驱动程序

在浏览器搜索`selenium Edge/Chrome/Firefox driver`， 进入对应的官网进行下载。

# 配置环境变量

将所有的exe文件放在同一文件夹， 我是放在了`D:\self space\webdriver`目录下。

将文件夹配置到环境变量path中，

点击`此电脑`->右键->`属性`->`高级系统设置`->`环境变量`->在系统变量中找到Path，双击->点击新建->输入路径
`D:\self space\webdriver`->点击确定保存。

# 安装绑定语言

> 这里首选的python， 所以前提是必须先安装好python，并安装、配置好python的环境变量。

让我们开始编写python代码吧！

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Edge() # 打开Edge浏览器
chrome = webdriver.Chrome() # 打开Chrome浏览器
firefox = webdriver.Firefox() # 打开Firefox浏览器
ie = webdriver.Ie() # 打开IE浏览器
opera = webdriver.Opera() # 打开Opera浏览器
driver.get("https://www.baidu.com") # 访问百度首页
driver.find_element(By.ID, "chat-textarea").click() # 点击聊天输入框
driver.find_element(By.ID, "chat-textarea").send_keys("selenium") # 输入selenium
driver.find_element(By.ID, "chat-submit-button").click() # 点击搜索按钮
driver.quit() # 退出浏览器

```

# 浏览器窗口基本操作

:::tip

这里拿Edge浏览器举例， 其他浏览器类似。 前置代码 : `driver = webDriver.Edge()`

:::

## 导航操作

```py
# 打开页面
driver.get("https://www.baidu.com")
# 后退
driver.back()
# 前进
driver.forward()
# 刷新
driver.refresh()
```

## 窗口操作

```py
# 最大化窗口
driver.maximize_window()
# 最小化窗口
driver.minimize_window()
# 关闭窗口
driver.close()
# 窗口移动到指定位置
driver.set_window_position(200, 100)
# 窗口调整到指定大小
driver.set_window_size(800, 600)
# 移动位置且调整大小
driver.set_window_rect(200, 100, 800, 600)
```

写一段test代码，来看到执行效果， 引入time模块， 让每个操作停顿2秒钟。

```py
from selenium import webdriver
import time

driver = webdriver.Edge()
driver.set_window_position(300, 500)
time.sleep(2)
driver.set_window_size(20, 30)
time.sleep(2)
driver.set_window_rect(700, 700, 800,800)
```

## 获取浏览器信息

:::tip

编写代码获取的是**字典**， 通过对应的键来获取具体属性值

:::

```py
print("获取位置对象：", driver.get_window_position())  
print("获取位置坐标 x 值：", driver.get_window_position()["x"]) 
print("获取位置坐标 y 值：", driver.get_window_position()["y"]) 
print("获取大小对象：", driver.get_window_size()) 
print("获取宽度值", driver.get_window_size()["width"]) 
print("获取高度值", driver.get_window_size()["height"]) 
print("获取位置及大小对象：", driver.get_window_rect()) 
print("获取位置坐标 x 值：", driver.get_window_rect()["x"]) 
print("获取位置坐标 y 值：", driver.get_window_rect()["y"]) 
print("获取宽度值：", driver.get_window_rect()["width"]) 
print("获取高度值：", driver.get_window_rect()["height"]) 

# 结果如下
获取位置对象： {'x': 700, 'y': 700}
获取位置坐标 x 值： 700
获取位置坐标 y 值： 700
获取大小对象： {'width': 800, 'height': 800}
获取宽度值 800
获取高度值 800
获取位置及大小对象： {'x': 700, 'y': 700, 'width': 800, 'height': 800}
获取位置坐标 x 值： 700
获取位置坐标 y 值： 700
获取宽度值： 800
获取高度值： 800
```

## 查找页面元素

| 查找方法         | 方法名                                 | 说明                                                                  |
|--------------|-------------------------------------|---------------------------------------------------------------------|
| ID定位         | find_element_by_id(value)           |                                                                     |
| name定位       | find_element_by_name(value)         |                                                                     |
| class定位      | find_element_by_class_name(value)   |                                                                     | 
| 链接的文本定位      | find_element_by_link_text(value)    |                                                                     |
| tagname定位    | find_element_by_tag_name(value)     |                                                                     |
| xpath定位      | find_element_by_xpath(value)        | value可以是`/html/body/div`也可以是`//span/input` `//span/input[last()]`   |
| css选择器定位     | find_element_by_css_selector(value) | css选择器各类的都可以`html > body > div` `[name=wd]` `[href$='123.com'`      |
| 使用`By`对象动态查找 | find_element(By.ID, value)等         | 需要引入`from selenium.webdriver.common.by import By`， 其他定位同上           |
| 查看多个元素       | find_elements(By.ID, value)等        | 方法名增加复数`s`， 匹配是集合                                                   |
| 嵌套查询         | 在方法调用后可以链式调用继续嵌套查找                  | 例如：`driver.find_element(By.ID, "form").find_element(By.NAME, "wd")` |

## 页面元素操作

#### 1. 点击元素

```py
driver.find_element(By.ID, "chat-textarea").click() # 点击聊天输入框
```

#### 2. 输入内容或上传附件

使用`send_keys()`方法， 附件则是直接传入文件的地址。

```py
driver.find_element(By.ID, "chat-textarea").send_keys("selenium") # 输入selenium
driver.find_element(By.ID, "upload").send_keys("D:\\self space\\file\\test.txt") # 上传附件
```

:::tip
附件需要找到的是, `<input type="file">`元素
:::

#### 3. 清空元素内容

```py
driver.find_element(By.ID, "chat-textarea").clear() # 清空聊天输入框
```

#### 4. 提交表单

只有当使用原生`form`元素的`submit`按钮时， 使用此方法。 

现代网页基本都使用点击按钮，来触发进行对应的校验等。

```py
driver.find_element(By.ID, "form").submit() # 提交表单
```

#### 5. 下拉框元素的选项操作

:::tip
下拉(多选)框需要使用`webdriver.support.select`模块中的`Select`类来操作。
:::












