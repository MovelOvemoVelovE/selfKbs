# 测试代码

使用pytest编写和运行测试代码。

> python提供了一款叫做pip的工具，用来安装第三方包， 所以更新频繁。 需要先更新下pip
>
> `python -m pip install --upgrade pip`
>
> `python -m pip` 是python运行pip模块
> `install --upgrade` 是更新python的包
> `pip` 是包管理工具

## 安装pytest

使用pip安装pytest：

```bash
python -m pip install --user pytest
```

## 测试简单函数

编写测试：

- 第一步是要有被测试的代码， 首先编写一个函数
- 第二步则是编写测试代码， 测试函数必须是`test_`开头, 更具有描述性
- 第三步做出一个断言， 断言函数的值是预想的那样
- 第四步运行测试 `pytest`， pytest会自动发现当前目录下所有以`test_`开头的函数并运行它们

:::code-group

```python[name_function.py]
def name_function(first, middle, last):
    full_name = f"{first} {last}"
    return full_name.title()


print(name_function("John", "Smith"))
```

```python[test_name_function.py]
from name_function import name_function


def test_name_function():
    assert name_function("John", "Smith") == "John Smith"
    assert name_function("Jane", "Doe") == "Jane Doe"
    assert name_function("Alice", "Johnson") == "Alice Johnson"
```

```shell
$ pytest
```

:::

## 未通过并修复

以上就是简单的测试可以通过的用例， 下面看一个测试未通过的例子， 并且未通过例子后咱们修改函数

:::code-group

```python[name_function.py]
def name_function(first, middle, last):
    full_name = f"{first} {last}"
    return full_name.title()  
```

```python[test_name_function.py]
from name_function import name_function
def test_name_function():
    assert name_function("John", "Smith") == "John Smith"
    assert name_function("Jane", "Doe") == "Jane Doe"
    assert name_function("Alice", "Johnson") == "Alice Johnson"
    assert name_function("John", "Paul", "Jones") == "John Paul Jones"
```

```shell
$ pytest
```

```python[修复后的name_function.py]
def name_function(first, middle='', last=''):
    if middle:
        full_name = f"{first} {middle} {last}"
    else:
        full_name = f"{first} {last}"
    return full_name.title()

```

:::

## 测试断言

断言是测试代码的核心， 它用来核实函数的输出是否符合预期。 断言的语法是`assert`关键字后跟一个表达式， 如果表达式为真， 测试通过；
如果为假， 测试失败并抛出`AssertionError`异常。

> 这里列出的只是九牛一毛， 测试可以包含任一条件语句表达的断言

| 断言示例                | 说明        |
|---------------------|-----------|
| `assert a == b`     | 断言a等于b    |
| `assert a != b`     | 断言a不等于b   |
| `assert a`          | 断言a为真     |
| `assert not a`      | 断言a为假     |
| `assert a in b`     | 断言a在列表b中  |
| `assert a not in b` | 断言a不在列表b中 |

## 测试类

编写对类的测试， 是对类的修改，证明类可以正确工作且改进没有任何意外的破坏原有行为。 测试通过，那么很多程序使用的就可以放心了。

首次我们编写一个类， 类的功能是一个 "匿名问卷调查"， 设置一个问题, 存储输入存储的答案，可以显示答案和问题。 然后使用这类，
用户不断输入答案， 当按下q后结束这次调查问卷并显示所有答案。 如下：

:::code-group

```python [survey.py]
class AnonymousSurvey:
    """收集匿名调查问卷的答案"""

    def __init__(self, question):
        """存储一个问题， 并为存储答案做准备"""
        self.question = question
        self.responses = []

    def show_question(self):
        """显示调查问卷"""
        print(self.question)

    def store_response(self, new_response):
        """存储单个答案"""
        self.responses.append(new_response)

    def show_results(self):
        """显示收集到的所有答案"""
        print("Survey results:")
        for response in self.responses:
            print(f"- {response}")
```

```python[language_survey.py]
from survey import AnonymousSurvey


question = "What language did you first learn to speak?"
my_survey = AnonymousSurvey(question)
my_survey.show_question()
while True:
    response = input("Language: ")
    if response == 'q':
        break
    my_survey.store_response(response)

print("\nThank you to everyone who participated in the survey!")
my_survey.show_results()
```

```python [test_survey.py]
from survey import AnonymousSurvey


def test_store_single_response():
    """测试单个答案能否被妥善的存储"""
    question = "What language did you first learn to speak?"
    language_survey = AnonymousSurvey(question)
    language_survey.store_response('English')
    assert 'English' in language_survey.responses


def test_store_multiple_responses():
    """测试多个答案能否被妥善的存储"""
    question = "What language did you first learn to speak?"
    language_survey = AnonymousSurvey(question)
    responses = ['English', 'Spanish', 'Mandarin']
    for response in responses:
        language_survey.store_response(response)
    for response in responses:
        assert response in language_survey.responses
```

:::

### fixture夹具

fixture可以帮助搭建测试环境、创建base对象、清理测试数据等。 通过使用fixture， 可以避免在每个测试函数中重复编写相同的代码。

以上的测试代码中， 两个测试函数都创建了`AnonymousSurvey`类的实例， 这部分代码是重复的。 我们可以使用fixture来消除重复代码：

```python
import pytest #[!code ++]

from survey import AnonymousSurvey


@pytest.fixture #[!code ++]
def language_survey(): #[!code ++]
    """创建一个调查对象""" #[!code ++]
    question = "What language did you first learn to speak?" #[!code ++]
    fixture_survey = AnonymousSurvey(question) #[!code ++]
    return fixture_survey #[!code ++]


def test_store_single_response(language_survey): #[!code ++]
    """测试单个答案能否被妥善的存储"""
    question = "What language did you first learn to speak?" #[!code --]
    language_survey = AnonymousSurvey(question) #[!code --]
    language_survey.store_response('English')
    assert 'English' in language_survey.responses


def test_store_multiple_responses(language_survey): #[!code ++]
    """测试多个答案能否被妥善的存储"""
    question = "What language did you first learn to speak?"  #[!code --]
    language_survey = AnonymousSurvey(question) #[!code --]
    responses = ['English', 'Spanish', 'Mandarin']
    for response in responses:
        language_survey.store_response(response)
    for response in responses:
        assert response in language_survey.responses
```




