---
highlight: vs2015
theme: vuepress
---

# 概念

数据库是**按照数据结构来组织、存储、管理数据的仓库。** 是一个**长期存储**在计算机内的， 有**组织的**、**可共享的**、统一管理的大量数据的**集合文件**。

# 分类

数据库分为两类： **非关系型数据库** 和 **关系型数据库**

非关系型数据库特点：

1. 灵活的数据模型
2. 无固定表结构
3. 高性能读写

---

关系型数据库特点：

1. 结构化数据模型
2. ACID事务
3. 负责查询语句
4. 数据统一性

> 数据怎么选择? 
> 
> 并不是说二选一的对立关系。 普遍是混合结合使用。
> 对程序主体数据使用关系型， 缓存数据及高并发数据存储到非关系型。

# 关系型数据库

- 关系型数据库遵循ER模型: 
  - E(Entity): 实体类别，一类数据对应数据库一张表存存储
  - R(Relationship): 表之间可以维护某种关系， 通过关联关系来操作多表
- 模型解释：
  - **库**为最大存储单位
  - **表**存储每类数据， **表**存储于**库**
  - **列**在**表**中，**列**定义了数据在表中如何存储
  - **行**在**表**中，**每一行**为一条数据记录

# 数据库管理系统(DBMS)

database-management-system，是一种操作和管理数据库的大型软件，用户通过使用软件来管理操作数据库中数据。

如： Oracle、mySql、DB2、SQLite。

# 库管理

## 创建库

```sql
# 如果没有则创建数据库
CREATE DATABASE IF NOT EXISTS ddd_dl1

# 指定字符集创建数据库
CREATE DATABASE IF NOT EXISTS ddd_dl2 CHARACTER SET uft8mb4 COLLATE uft8mb4_0900_as_cs

# 查看默认字符集和排序规则
SHOW VARIABLES LIKE 'character_set_database'
SHOW VARIABLES LIKE 'collation_database'
```

> 在mysql中默认字符集为: uft8mb3是以3字节存储的可能会存在乱码。
> 
> 排序方式默认为: utf8mb4_0900_ai_cs: 是不区分大小写的。 以上的命令将默认值修改

## 查看/选择库

```sql
# 查看所有库
SHOW DATABASES

# 查看当前库
SELECT DATABASE()

# 查看指定库的所有表
SHOW TABLES FROM `mysql`

# 查看库的创建信息
SHOW CREATE DATABASE `mysql`

# 切换、选中库
USE `dd_dl2`
```

## 修改库

```sql
ALTER DATABASE dd_dl2 CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs
```

## 删除库

```sql
DROP DATABASE dd_dl2
DROP DATABASE IF EXISTS dd_dl3
```

# 表管理

## 创建表

创建表，不仅要指定**表名**和**字符集**, 还需要指定**列名**和**列类型**， 甚至会加入一些约束，比如： 必填。

核心元素是必须要写的： 指定表名、列名、列类型

可选要素是可选写的： 指定列约束、表配置、注释

```sql
CREATE TABLE IF NOT EXISTS books (
    book_name VARCHAR(20) COMMENT '图书名',
    book_price DOUBLE(4, 2) COMMENT '图书价格',
    book_num INT COMMENT '图书库存'
) CHARSET = utf8mb4 COMMENT '图书表'
```

## 查看表

```sql
SHOW TABLES FROM `dd_dl2`

# 查看表信息
desc dd_dl2
```

## 数据类型

数据类型有： 枚举、整数、浮点数、定点数、字符串、日期时间、json， 多选字符串(`set`)。

> 给表格列增加数据类型的符号，可以使用**unsigned**修饰符。
> 
> `student_high TINYINT(4, 2) UNSIGNED COMMENT '学生身高',`

### 枚举类型

```sql
CREATE TABLE IF NOT EXISTS t_employee(
    gender ENUM('男', '女') CHARACTER SET utf8mb4 COLLATE uft8mb4_0900_ai_ci NOT NULL DEFAULT '男' COMMENT '性别',
)CHARSET=utf8mb4 COLLATE=uft8mb4_0900_ai_ci;
```

### set多选字符串

```sql
CREATE TABLE IF NOT EXISTS t_employee(
    address SET('北京', '深圳', '上海', '武汉', '杭州')
)CHARSET=utf8mb4 COLLATE=uft8mb4_0900_ai_ci;
```

### 整数类型

| 类型      | 存储字节 | 幂等 | 是否为标准数据 |
|-----------|----------|------|----------------|
| TINYINT   | 1        | 8    | 否             |
| SMALLINT  | 2        | 16   | 是             |
| MEDIUMINT | 3        | 24   | 否             |
| INT       | 4        | 32   | 是             |
| BIGINT    | 8        | 64   | 否             |

### 浮点数(不推荐使用)

| 类型         | 存储字节 | M(小数+ 整数位数) | D(小数) |
|--------------|----------|-------------------|---------|
| FLOAT(M, D)  | 4        | 24                | 8       |
| DOUBEL(M, D) | 8        | 53                | 30      |

### 定点数

精度高， 适合货币的存储、商品价格

| 类型          | 存储字节 | M(小数+ 整数位数) | D(小数) |
|---------------|----------|-------------------|---------|
| DECIMAL(M, D) | 动态存储 | 65                | 30      |

### 字符串

| 类型       | 存储字节 | M(字节)                    | 存储空间          |
|------------|----------|----------------------------|-------------------|
| CHAR(M)    | 固定长度 | 0 <= M <= 255              | M + 4字节         |
| VARCHAR(M) | 可变长度 | mysql一行数据最多65535字节 | (M + 4 + 1)个字节 |

> **注意：**
> 
> CHAR(M)类型一般需要预先定义字符串长度， 如果不指定M，则表示长度默认是1个字节。
> 
> 保存数据实际长度比CHAR类型长度小，则会右侧填充空格达到指定长度。
> 
> MySQL检索CHAR类型数据时， CHAR类型字段会去除尾部的空格

> **注意：**
> 
> 定义VARCHAR定义时，必须指定长度M，否则报错。
> 
> varchar(20)指的是20字符
> 
> 检索VARCHAR，会保留数据尾部的空格

### 文本

| 类型       | 特点               | 存储范围(字节)       | 存储空间             |
|------------|--------------------|----------------------|----------------------|
| TINYTEXT   | 小文本、可变长度   | 0 <= L <= 255        | L + 2字节            |
| TEXT       | 文本、可变长度     | 0 <= L <= 65535      | L + 2字节            |
| MEDIUMTEXT | 中等文本、可变长度 | 0 <= L <= 16777215   | L + 3字节            |
| LONETEXT   | 大文本、可变长度   | 0 <= L <= 4294967295 | L + 4字节（最大4GB） |

> 开发经验：
> 
> - 短文本， 固定长度使用char： 手机号和性别
> 
> - 短文本， 非固定长度使用varchar： 姓名、地址
> 
> - 大文本： 建议存储到文本文件，使用varchar记录文件地址，不使用TEXT直接存储，性能非常差。

### 时间类型

| 类型      | 名称     | 字节 | 日期格式            | 最小值               | 最大值              |
|-----------|----------|------|---------------------|----------------------|---------------------|
| YEAR      | 年       | 1    | YYYY或YY            | 1901                 | 2155                |
| TIME      | 时间     | 3    | HH:MM:SS            | -838:59:59           | 838:59:59           |
| DATE      | 日期     | 3    | YYYY-MM-DD          | 1000-01-01           | 9999-12-03          |
| DATETIME  | 日期时间 | 8    | YYYY-MM-DD HH:MM:SS | 1000-01-01 00: 00:00 | 9999-12-31 23:59:59 |
| TIMESTAMP | 日期时间 | 4    | YYYY-MM-DD HH:MM:SS | 1000-01-01 00: 00:00 | 9999-12-31 23:59:59 |

```sql
CREATE TABLE IF NOT EXISTS classes (
    # 插入默认当前时间和修改自动更新当前时间
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    # 插入默认当前
    ts1 TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dt1 DATETIME DEFAULT  CURRENT_TIMESTAMP
) CHARSET = utf8mb4
```

## 修改、删除表

```sql
# 在students表中增加字段在stu_height之前
ALTER TABLE `students` ADD stu_height1 FIRST
# 在students表中增加字段在stu_height之后
ALTER TABLE `students` ADD stu_height1 AFTER stu_height

# 修改表的列名
ALTER TABLE `students` CHANGE stu_height2 stu_height1 DOUBLE(3, 2) #[first|after 字段名] 
# 修改表的列类型
ALTER TABLE `students` MODIFY stu_height2 DOUBLE(3,3)
# 修改表删除一列
ALTER TABLE `students` DROP stu_height2
# 修改表名
ALTER TABLE students RENAME TO student

# 删除数据表
DROP TABLE IF EXISTS student, libds

# 清空数据表 同时删除表的id记录最大值
TRUNCATE TABLE student
```

# 数据定义篇总结

## 示例一

```sql
/*
  场景1： 设计一个简单的图书管理系统，创建一个名为 book_libs 的数据库，决定使用
    utf8mb4 的字符串，排序方式使用大小写敏感的 utf8mb4_0900_as_cs
  场景2： 创建一个学生表 students 来存储借书的学员信息，其中包含
    学生姓名 stu_name varchar(10)、
    性别 stu_sex char
    年龄 stu_age TINYINT unsigned、
    身高 stu_height double(4, 2)、
    生日 stu_brithday date、
    注册时间 stu_register TIMESTAMP 、
    更新时间 stu_newtime TIMESTAMP
    等属性。
*/

CREATE DATABASE IF NOT EXISTS book_libs CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs

USE book_libs

CREATE TABLE IF NOT EXISTS students(
  stu_name VARCHAR(10) COMMENT '学生姓名',
  stu_age TINYINT COMMENT '学生年龄',
  stu_height DOUBLE(3,2) COMMENT '学生身高',
  stu_brithday DATE,
  stu_register DATETIME DEFAULT CURRENT_TIMESTAMP,
  stu_newtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARSET utf8mb4
```

## 示例二

```sql
/*
  1. 创建表格employees, 字段信息如下：
    emp_num int(11)
    last_name varchar(50)
    first_name varchar(25)
    mobile varchar(25)
    code int
    job_title varchar(50)
    birth date
    note varchar(255)
    sex varchar(5)
  2. mobile字段修改到code字段后面
  3. birth字段修改名为 birthday
  4. 修改sex字段为 char(1)
  5. 删除note字段
  6. 增加favoriate_activity 类型为varchar(100)
  7. 修改表名称为 employees_info
*/
SELECT DATABASE()

CREATE TABLE IF NOT EXISTS employees(
 emp_num INT COMMENT '员工数量',
 last_name VARCHAR(50) COMMENT '员工名',
 first_name VARCHAR(25) COMMENT '员工姓',
 mobile VARCHAR(25) COMMENT '员工手机号',
 `code` INT COMMENT '员工工号',
 job_title VARCHAR(50) COMMENT '员工职位',
 birth DATE COMMENT '员工生日',
 note VARCHAR(255) COMMENT '员工笔记',
 sex VARCHAR(5) COMMENT '员工性别'
) CHARSET utf8mb4;

SHOW TABLES FROM `book_libs`;

DESC employees_info;

ALTER TABLE employees MODIFY mobile VARCHAR(25) AFTER `code`;

ALTER TABLE employees CHANGE birth birthday DATE;

ALTER TABLE employees MODIFY sex CHAR(1);

ALTER TABLE employees DROP note;

ALTER TABLE employees ADD favoriate_activity VARCHAR(100);

ALTER TABLE employees RENAME employees_info;
```

---

# 数据操作篇

data manipulation language(DML)

主要有三个关键字： `insert update delete `

## 插入操作

```sql
# 插入一行所有字段
INSERT INTO `students` VALUES(1, 'pupu', 23, '2007-6-2', '201.2')

# 指定列插入
INSERT INTO `students` (stu_name, stu_birthday) VALUES('hu', '2007-6-2')

# 同时插入多条记录
INSERT INTO `students` VALUES(2, 'xiao', 23, '2023-6-2', '21.2'), (3, 'liu', 33, '2117-6-2', '202.2');

INSERT INTO `students` (stu_id, stu_name, stu_age, stu_height) VALUES(5, 'xiaoxiao', 45, NULL)
```

### 插入示例

```sql
/*
 创建库 dml_dl1 
 stu_id int 
 stu_name varchar(100)
 stu_age tinyint unsigned 
 sty_birthday date 
 sty_height becimal(4,1) default 200

 插入一名， 所有
 插入一名， 学号 名字 年龄, 其他默认值
 插入两名， 包含所有
 插入一名 只提供学号 名字 年龄，其他为空
*/

SELECT DATABASE()
CREATE DATABASE IF NOT EXISTS dml_dl1
USE `dml_dl1`
SHOW TABLES FROM dml_dl1

CREATE TABLE IF NOT EXISTS students_2(
 stu_id INT COMMENT '学生学号',
 stu_name VARCHAR(100) COMMENT '学生姓名',
 stu_age TINYINT UNSIGNED COMMENT '学生年龄',
 stu_birthday DATE COMMENT '学生生日',
 stu_height DECIMAL(4,1) DEFAULT 200 COMMENT '学生身高'
);

DESC students_2

INSERT INTO `students_2` VALUES(1, 'pupu', 23, '2007-6-2', '201.2')

INSERT INTO `students_2` (stu_name, stu_birthday) VALUES('hu', '2007-6-2')

INSERT INTO `students_2` VALUES(2, 'xiao', 23, '2023-6-2', '21.2'), (3, 'liu', 33, '2117-6-2', '202.2');

INSERT INTO `students_2` (stu_id, stu_name, stu_age, stu_height) VALUES(5, 'xiaoxiao', 45, NULL)
```

## 修改操作

```sql
# 修改表中所有数据
UPDATE students
    SET stu_name = 'xx'

# 修改表中符合条件的数据
UPDATE students
    SET stu_name = 'xx'
    WHERE stu_id= 3
```

### 小示例

1. 将数据库所有姓名改为'xx'
2. 将年龄小于20的学生身高**增加**2
3. 将学号为11的学生生日修改为'2022-07-10', 年龄修改为21
4. 所有学生年龄减少1岁

```sql
DESC students

UPDATE students 
    SET stu_name = 'xx'

UPDATE students 
    SET stu_height = stu_height + 2.0
    WHERE stu_age < 20

UPDATE students
    SET stu_birthday='2022-07-10', stu_age=21
    WHERE stu_id = 6

UPDATE students
    SET stu_age=stu_age - 1
```

## 删除操作

```sql
# 清空表格数据
TRUNCATE TABLE `students_2`;
# 删除所有行
DELETE FROM `students_2`

# 条件删除
DELETE FROM `students` WHERE stu_id = 9
```

# 数据查询篇

## 概述

DQL(data-query-language)， 用于数据库的查询操作。

不会影响库表结构，不会影响库表数据

**DQL会基于原表查询一个新的虚拟表**

> `SELECT`关键字来查询

## 分类

数据查询语言分为单表查询和多表查询

### 单表查询

单表查询使用：

1. select语法
2. where语法
3. 运算符号
4. 单行多行函数
5. 分组和排序等等
   来实现最后的虚拟表查询

### 多表查询

在单表查询的基础上，增加学习一个**合并语法**。

## 基本查询语法

```sql
# 查询非表信息
SELECT 1
SELECT 9/2
SELECT VERSION()
# 查询当前时间
SELECT NOW()

# 查询指定表
SELECT stu_id, stu_name, stu_age FROM students
# 查询指定表
SELECT students.stu_name, students.stu_birthday, students_2.* FROM students, students_2

# 查询列起别名
SELECT stu_id AS id, stu_name AS stuNames FROM students
# as关键字可以用空格代替
SELECT stu_id id, stu_name stuname FROM students

# 去除重复行
SELECT DISTINCT * FROM students

# 查询常数
SELECT '刘潇' AS mastername, stu_id FROM students
```

---

**小示例**

```sql
-- 创建库 
SHOW DATABASES
CREATE DATABASE IF NOT EXISTS dql_test01
SELECT DATABASE()
USE dql_test01

-- 创建表
DROP TABLE IF EXISTS t_employee
CREATE TABLE IF NOT EXISTS t_employee(
    eid INT NOT NULL COMMENT '员工编号',
    ename VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '员工姓名',
    salary DOUBLE NOT NULL COMMENT '薪资',
    commission_pct DECIMAL(3,2) DEFAULT NULL COMMENT '奖金比例',
    birthday DATE NOT NULL COMMENT '出生日期',
    gender ENUM('男', '女') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '男' COMMENT '性别',
    tel CHAR(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '手机号码',
    emaill VARCHAR(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '邮箱',
    address VARCHAR(150) DEFAULT NULL COMMENT '地址',
    work_place SET('北京', '深圳', '上海', '武汉', '杭州') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '北京' COMMENT '工作地点'
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DESC t_employee 

-- 插入数据
INSERT INTO `t_employee`
    (`eid`, `ename`, `salary`, `commission_pct`, `birthday`, `gender`, `tel`, `emaill`, `address`, `work_place`)
    VALUES 
        (1, '寻红利', 28000, '0.15', '1980-01-10', '男', '17824152234', 'qweqw@qq.com', '西刘家', '北京,深圳'),
        (2, '速度', 8000, '0.25', '1981-01-10', '男', '17824152234', 'qweqw@qq.com', '西刘家', '北京,深圳'),
        (3, '两兄弟', 12000, '0.35', '1982-01-10', '女', '17824152234', 'qweqw@qq.com', '西刘家', '北京,深圳'),
        (4, '刘洪生', 4000, NULL, '1983-01-10', '男', '17824152234', 'qweqw@qq.com', '西刘家', '北京,深圳'),
        (5, '赵红霞', 56000, '0.65', '1984-01-10', '女', '17824152234', 'qweqw@qq.com', '西刘家', '北京,深圳'),
        (6, '阿瑟的', 6000, '0.85', '1982-01-10', '男', '17824152234', 'qweqw@qq.com', '西刘家', '北京,深圳'),
        (7, '期望', 600, NULL, '1980-01-10', '男', '17824152234', 'qweqw@qq.com', '西刘家', '北京,深圳'),
        (8, '正常', 1200, '0.65', '1980-01-10', '女', '17824152234', 'qweqw@qq.com', '西刘家', '北京,深圳'),
        (9, '算法', 2300, '0.65', '1983-01-10', '男', '17824152234', 'qweqw@qq.com', '西刘家', '北京,深圳'),
        (10, '扫的起', 1230, NULL, '1983-01-10', '女', '17824152234', 'qweqw@qq.com', '西刘家', '北京,深圳'),
        (11, '啊上档次', 2200, '0.15', '1983-01-10', '男', '17824152234', 'qweqw@qq.com', '西刘家', '北京,深圳'),
        (12, '装掉线', 2700, '0.65', '1980-01-10', '男', '17824152234', 'qweqw@qq.com', '西刘家', '北京,深圳'),
        (13, '安定区', 2120, '0.65', '1983-01-10', '女', '17824152234', 'qweqw@qq.com', '西刘家', '北京,深圳'),
        (14, '算法', 9900, '0.55', '1980-01-10', '男', '17824152234', 'qweqw@qq.com', '西刘家', '北京,深圳'),
        (15, '少打', 12000, '0.65', '1983-01-10', '女', '17824152234', 'qweqw@qq.com', '西刘家', '北京,深圳'),
        (16, '扫的起', 134000, '0.65', '1981-01-10', '男', '17824152234', 'qweqw@qq.com', '西刘家', '北京,深圳'),
        (17, '关注下', 99000, '0.65', '1980-01-10', '男', '17824152234', 'qweqw@qq.com', '西刘家', '北京,深圳'),
        (18, '服务器', 121000, '0.65', '1981-01-10', '男', '17824152234', 'qweqw@qq.com', '西刘家', '北京,深圳')

-- 查询数据
DESC t_employee
-- 1. 查询所有员工信息
SELECT * FROM `t_employee`
-- 2. 查询所有员工姓名、工资、工作地址
SELECT ename, salary, work_place FROM t_employee
-- 3. 查询所有员工姓名、月薪、年薪
SELECT  ename, salary, salary*12 AS yearSalary FROM t_employee
-- 4. 查询所有员工姓名、月薪、奖金、每月总收入
SELECT ename, salary, IFNULL(commission_pct, 0) * salary AS 奖金, salary + IFNULL(commission_pct, 0)*salary AS 月总收入 FROM t_employee
-- 5. 查询所有员工一共有多少种薪资
SELECT DISTINCT salary FROM t_employee
```

> 如果默认值是null，怎么运算结果都为null， 比如计算奖金数额
> 可以使用IFNULL(列名，默认值)来进行操作

## 条件查询

查看表结构

```sql
DESCRIBE t_employee
DESC t_employee
```

可视化工具就可以告诉你表结构的信息：

- Field 字段名
- Type 字段类型
- Null 是否可以存储控制
- Key 使用编制索引
- Default 默认值
- Extra 附件信息

> 条件查询使用**WHERE**关键字跟随条件

如： 

```sql
SELECT * FROM t_employee 
    WHERE salary>9000

SELECT ename, salary, salary*12 
    FROM t_employee
    WHERE salary*12 > 200000

SELECT * 
    FROM t_employee
    WHERE gender='女' AND salary>8000
```

## 运算符使用

### 算术运算符

1. +
2. -
3. *
4. /
5. %(或MOD)
6. DIV(整数除法)

> 除以0返回NULL， 而不是报错

**小示例**

```sql
DESC t_employee
-- 1. 查询薪资奖金和大于20000的员工信息
SELECT *, salary+salary*IFNULL(commission_pct, 0) AS 奖金和
    FROM t_employee
    WHERE salary+salary*IFNULL(commission_pct, 0) >20000
-- 2. 查询薪资减去奖金差小于8000的员工
SELECT *, salary-salary*IFNULL(commission_pct, 0) AS 奖金差
    FROM t_employee
    WHERE salary-salary*IFNULL(commission_pct, 0) < 8000
-- 3. 查询所有员工姓名、工资、奖金信息
SELECT ename, salary, commission_pct
    FROM t_employee
-- 4. 查询员工编号是偶数的员工信息
SELECT *
    FROM t_employee
    WHERE eid MOD 2 = 0
```

### 比较运算符

| 运算符               | 描述                |
|----------------------|---------------------|
| >                    | 大于                |
| >=                   | 大于等于            |
| <                    | 小于                |
| <=                   | 小于等于            |
| <>, !=               | 不等于              |
| =                    | 相等                |
| <=>                  | null 安全等于运算符 |
| is null              | 是否为null          |
| is not null          | 是否不为null        |
| between ... and...   | 在值范围内          |
| not between... and.. | 不在值范围内        |
| in()                 | 在一组值内          |
| not in()             | 不在一组值内        |
| like                 | 模糊搜索            |
| not like             | 否定模糊搜索        |

> 比较运算符结果为1, 0, null. 1为true， 其他为false

> 数字与字符串之间会相互转换

```sql
# 等于对比
SELECT 1=0  -- 0
SELECT '0' = 0 -- 1
SELECT '0.0'=0 -- 1
SELECT '.01'=0.01 -- 1
SELECT 1<=>1, NULL<=>NULL, 1<=>NULL -- 1, 1, 0
SELECT 1<=>1, NULL IS NULL, 1 IS NULL -- 1, 1, 0
SELECT 1=1, NULL=NULL, 1=NULL -- 1, null, null
# 不等于对比
SELECT '.01' <> '0.01' -- 1
SELECT .01 <> '0.01' -- 0
SELECT 'zap' <> 'zappp' -- 1
# 区间运算
SELECT 2 BETWEEN 1 AND 3, 2 BETWEEN 3 AND 1 -- 1, 0
# 组范围对比
SELECT 2 IN (0,4,1) -- 0
# 简单匹配模式
-- like运算符主要用于匹配字符串的模糊搜索
-- 满足条件为1， 不满于为0， 匹配条件为null，返回null
-- _字符只代替一个字符
-- %代替多个或0个字符
SELECT 'asdqewqeq' LIKE '%', 'abc' LIKE '_a%', 'abc' LIKE 'a%' -- 1, 0 ,1 
SELECT 'asdqewqeq' LIKE '%', 'abc' LIKE '_a%', 'abc' LIKE 'a%' -- 1, 0 ,1 
# 特殊情况，多列对比
SELECT (1,3) = (1,2) -- 0 意思是 1=1 and 3 =2
SELECT (1,3) <=> (NULL, 3) -- 0, 意思是1<=>null and 3 <=> 3
SELECT (1,3) <> (2, 3) -- 1 ,意思是 1<>1 or 3 <>3
```

#### 比较运算符习题

```sql
UPDATE t_employee
    SET address=NULL
    WHERE eid=13

SELECT DATABASE()
SHOW TABLES FROM `dql_test01`
DESC `t_employee`
# 比较运算符习题
    #1. 查询员工编号为1的员工信息
    SELECT *
        FROM t_employee
        WHERE eid = 1
    #2. 查询薪资大于5000的员工信息
    SELECT * 
        FROM t_employee 
        WHERE salary > 5000
    #3. 查询有奖金的员工信息
    SELECT * 
        FROM t_employee
        WHERE commission_pct IS NOT NULL
    #4. 查询出生日期在1980-01-01 和 1982-01-01之间的员工信息
    SELECT *
        FROM t_employee
        WHERE birthday BETWEEN '1980-01-01' AND '1982-01-01'
    #5. 查询性别为女性的员工信息
    SELECT *
        FROM t_employee
        WHERE gender='女'
    #6. 查询手机号码在183开头的员工信息
    SELECT *
        FROM t_employee
        WHERE tel LIKE '178%'
    #7. 查询邮箱结尾为 @163.com结尾的员工信息
    SELECT *
        FROM t_employee
        WHERE emaill LIKE '%@qq.com'
    #8. 查询地址为null的
    SELECT *
        FROM `t_employee`
        WHERE address IS NULL
    #9. 查询工作地点在 北京 上海 或者是 深圳的员工信息
    SELECT *
        FROM `t_employee`
        WHERE work_place IN ('北京', '上海')
    #10. 查询员工姓是 张的
    SELECT *
        FROM `t_employee`
        WHERE ename LIKE '算%'
    #11. 查询出生日期不在 1980-01-01 和 2000-01-01之间的员工信息
    SELECT *
        FROM `t_employee`
        WHERE birthday NOT BETWEEN '1981-01-01' AND '2000-01-01'
    #12. 查询性别不是 男
    SELECT *
        FROM `t_employee`
        WHERE gender <> '男'
    #13. 查询员工编号为奇数
    SELECT *
        FROM `t_employee`
        WHERE eid%2<>0
```

### 逻辑运算符

逻辑运算符返回结果为： 0, 1, NULL

| 运算符  | 描述                                   |
|---------|----------------------------------------|
| AND, && | 逻辑且                                 |
| NOT, !  | 逻辑否定                               |
| OR,     |                                        |
| XOR     | 逻辑异或， 两边一个为true，一个为false |

> mysql将非0和非NULL计算为true

## 单行多行函数

sql函数分为**内置函数**和**自定义函数**， 而单行多行函数是**内置函数**

单行函数是对**一行的列进行操作，返回值为单一值**， 有：

- 数值函数
- 日期函数
- 字符函数
- 流程函数
- 信息函数
- 时间函数

多行函数是对**多行的列操作函数，返回值为单一值** 有： **聚合函数**

### 数值函数

| 函数                     | 描述                             |
|--------------------------|----------------------------------|
| ABS(x)                   | 绝对值                           |
| SIGN(x)                  | 返回符号，正数为1，负数-1， 0为0 |
| PI(x)                    | 返回圆周率的值                   |
| **CEIL(x)， CEILING(x)** | 向上取整数                       |
| **FLOOR(X)**             | 向下取整数                       |
| LEAST(x1, x2, .....)     | 返回列表最小值                   |
| GREATEST(x1,x2....)      | 返回列表最大值                   |
| MOD(x,y)                 | 取余数                           |
| RAND()                   | 0-1随机值                        |
| RAND(x)                  | x相同的话，返回随机值相同        |
| ROUND(x)                 | 向上向下取整数（四舍五入）       |
| ROUND(x,y)               | 同上，并保留y的小数位            |
| TRUNCATE(x,y)            | 返回x截断为y位小数点的结果       |
| SQRT(x)                  | 平方根，负数为NULL               |

```sql
SELECT 
    ABS(-5.5),          # 5.5
    SIGN(-21),          # -1
    CEILING(5.7),       # 6
    FLOOR(5.1),         # 5
    LEAST(1,2,3,4,1,2,1), # 1
    GREATEST(1,2,3,13,12,312,3), # 312
    MOD(5,2),           # 1
    RAND(),             # 0.123456789 (示例随机值，实际每次不同)
    RAND(2),            # 0.6555866465490187 (固定种子生成固定值)
    RAND(2),            # 0.6555866465490187 (同上)
    ROUND(5.5),         # 6
    ROUND(5.1),         # 5
    ROUND(5.2313,2),    # 5.23
    TRUNCATE(5.23123123, 4), # 5.2312 (直接截断不四舍五入)
    SQRT(3);            # 1.7320508075688772
```

### 字符函数

| 函数                                   | 用法                                                                   |
|----------------------------------------|------------------------------------------------------------------------|
| CHAR_LENGTH(s)                         | 字符数，同CHARACTER_LENGTH(s)                                          |
| LENGTH(s)                              | 返回字节数，与字符集有关                                               |
| CONCAT(s1,s2...)                       | 拼接                                                                   |
| INSERT(str, index, number, replaceStr) | 同数组splice                                                           |
| REPLACE(str, a, b)                     | str的出现的a 替换为b                                                   |
| UPPER(s) \|                            | UCASE(s)                                                               |
| LOWER(s) \|                            | LCASE(s)                                                               |
| LEFT(str, n)                           | 返回左侧n个字符                                                        |
| RIGHT(str, n)                          | 返回右侧n个字符                                                        |
| TRIM(s)                                | 去空格                                                                 |
| SUBSTR(str, index, length)             | 截取index位置的length个字符串， 同SUBSTRING(str, i, n)、MID(str, i, n) |
| FIND_IN_SET(s，set)                    | 字符串s在set数据中出现的位置                                           |
| REVERSE(s)                             | 翻转字符串                                                             |
| NULLIF(s1, s2)                         | 比较两个字符串，相等返回NULL， 不相等返回s1                            |

### 时间函数

| 函数                      | 用法               |
|---------------------------|--------------------|
| CURDATE()、CURRENT_DATE() | 当前日期，年月日   |
| CURTIME()、CURRENT_TIME() | 当前时间，时分秒   |
| NOW()、SYSDATE()          | 当前系统日期和时间 |
| UTC_DATE()                | 世界标准日期       |
| UTC_TIME()                | 世界标准时间       |

| 提取时间函数                                 | 用法                                            |
|----------------------------------------------|-------------------------------------------------|
| YEAR(d)、MONTH(d)、DAY(d)                    | 提取具体日期                                    |
| HOUR(t)、MINUTE(t)、SECOND(t)                | 具体时间                                        |
| MONTHNAME()、DAYNAME()、WEEKDAY()、QUARTER() | 英文月份、英文星期、返回周几(0是周日)、对应季度 |
| WEEK()、WEEKOFYEAR()                         | 一年中的第几周                                  |
| DAYOFYEAR()、DAYOFMONTH()、DAYOFWEEK()       | 一年的第几天、所在月份第几天、周几(周日是1)     |

| 时间计算函数                                                                          | 描述                       |
|---------------------------------------------------------------------------------------|----------------------------|
| DATE_ADD(datetime, INTERVAL 差值 时间类型), ADDDATE(datetime, INTERVAL 差值 时间类型) | 返回时间相加的结果         |
| DATE_SUB(datetime, INTERVAL 差值 时间类型), SUBDATE(datetime, INTERVAL 差值 时间类型) | 返回时间相减的结果         |
| ADDTIME(time1, time2)、SUBTIME(time1, time2)                                          | 时间相加减                 |
| DATEDIFF(date1, date2)                                                                | 日期间隔天数               |
| TIMEDIFF(time1, time2)                                                                | 时间间隔                   |
| FROM_DAYS(N)                                                                          | 从0000年开始N天后日期      |
| TO_DAYS(date)                                                                         | 日期距离0000年的天数       |
| LAST_DAYS()                                                                           | 所在月份的最后一天的日期   |
| MAKEDATE(year, n)                                                                     | 给定年份和天数的日期       |
| MAKETIME(hour, minute, second)                                                        | 给定时分秒组合成时间并返回 |

| 时间格式化函数            | 描述                             |
|---------------------------|----------------------------------|
| DATE_FORMAT(date, format) | 格式化日期                       |
| TIME_FORMAT(time, format) | 格式化时间                       |
| STR_TO_DATE(str, format)  | 将字符串按照format解析为一个日期 |

| 格式化描述 | 说明                      |
|------------|---------------------------|
| %Y         | 4位数字表示年份           |
| %y         | 2位数字表示年份           |
| %m         | 2位数字代表月份           |
| %d         | 2位数字表示天数           |
| %H         | 2位数字表示小时，24小时制 |
| %i         | 2位数字表示分钟           |
| %S         | 2位数字表示秒             |

---

**小习题**

```sql
# 查询今天过生日的
SELECT * FROM `t_employee` WHERE DAY(birthday)=DAY(NOW()) AND MONTH(birthday)=MONTH(NOW())
SELECT * FROM `t_employee` WHERE DATE_FORMAT(birthday, '%m-%d')=DATE_FORMAT(NOW(), '%m-%d')
# 查询本月过生日的
SELECT * FROM `t_employee` WHERE MONTH(birthday)=MONTH(NOW())
# 查询下月过生日的
SELECT * FROM `t_employee` WHERE MONTH(birthday)=MONTH(NOW())+1 
SELECT * FROM `t_employee` WHERE MONTH(birthday)=MONTH(ADDDATE(NOW(), INTERVAL 1 MONTH))
# 查询姓名、工资、年龄信息
SELECT ename, salary, ROUND(DATEDIFF(NOW(), birthday)/365, 1) age FROM `t_employee`
# 查询年龄在23-35之间的
SELECT *, DATEDIFF(NOW(), birthday)/365 AS age FROM t_employee WHERE DATEDIFF(NOW(), birthday)/365 BETWEEN 23 AND 35
```

### 流程控制函数(条件语句)

流程函数主要有: **IF()、IFNULL()、CASE()**

IF函数是执行条件语句。`IF(1=1, 正确的返回值, 错误的返回值)`

IFNULL是处理null值, 如果是null返回指定值，不是还是原值, `IFNULL(birthday, 返回值)`

CASE表达式有两种：

```sql
# 第一种
CASE
	WHEN 表达式 THEN result1
	WHEN 表达式2 THEN result2
	ELSE 默认值
END
# 第二种
CASE 表达式或者列
	WHEN 上述表达式的值 THEN result1
	WHEN 上述表达式的值2 THEN result2
	ELSE 默认值
END
```

---

**小习题**

```sql
# 练习：
DESC `t_employee`
SELECT * FROM `t_employee`
# 1. 根据员工生日， 早于1990年之前， 薪资涨幅为当前薪资的10%， 否则为5%
SELECT *, salary, ROUND(IF(YEAR(birthday)<1990, salary*1.1, salary*1.05), 2) AS newSalary 
	FROM `t_employee`
# 2. 查询员工编号、姓名，生成一个type列， 根据性别显示男员工还是女员工
SELECT eid, ename, IF(gender='男', '男员工', '女员工') AS `type` 
	FROM `t_employee`
# 3. 查询员工姓名和工资以及 奖金数额(salary*commission_pct)(乘下来有null)
SELECT ename, salary, IFNULL(salary*commission_pct, 0) AS 奖金数额
		FROM `t_employee`
# 4. 查询姓名、性别、 补助金额 (男性基础 2000， 女性基础 3000， 基础值乘以 commission_pct, 其他是0， commission_pct为null算0.1比例)
SELECT ename, gender, IFNULL(commission_pct, 0.1) * (IF(gender='男', 2000, 3000)) AS 补助金额
		FROM `t_employee`
# 基于case when
SELECT ename, gender, 
		CASE 
			WHEN gender='男' THEN 2000 * IFNULL(commission_pct, 0.1)
			WHEN gender='女' THEN 3000 * IFNULL(commission_pct, 0.1)
		END AS 补助金额
		FROM `t_employee`
# 基于case expression
SELECT ename, gender, 
		CASE gender
			WHEN '男' THEN 2000 * IFNULL(commission_pct, 0.1)
			WHEN '女' THEN 3000 * IFNULL(commission_pct, 0.1)
		END AS 补助金额
		FROM `t_employee`
```

## 多行函数/聚合函数

聚合函数用于统计数据和计算，最终返回一条结果。如: 统计数量、求和、求平均值、最大值、最小值。

> 1. 不可以嵌套使用
> 1. null不处理、不关注

| 聚合函数 | 描述 |
|----------|------|
| COUNT(列名/*/1)  | 统计数量，*和1是统计全部行数 |
| SUM()    | 求和 |
| AVG()    | 求平均值 |
| MAX()    | 求最大值 |
| MIN()    | 求最小值 |

**小习题**

```sql
DESC `t_employee`
SELECT * FROM `t_employee`
# 1. 求平均工资、最大工资和最小工资 和总工资
SELECT AVG(salary), MAX(salary), MIN(salary), SUM(salary)
	FROM `t_employee`

# 2. 最大年龄和最小年龄的生日
SELECT MAX(birthday), MIN(birthday)
	FROM `t_employee`
# 3. 求员工总数和有奖金的员工数
SELECT COUNT(*), COUNT(1), COUNT(commission_pct)
		FROM `t_employee`
```

## 分组查询

先将行分为若干组，然后查询**每组的特性**。

分组查询结果只能是**分组特性列或者聚合函数**。

```sql
SELECT 分组列，分组列，聚合函数
	FROM `t_employee`
	WHERE 条件
	GROUP BY 分组列, 分组列 HAVING 分组后的where条件
```

**小习题**

```sql
DESC `t_employee`
SELECT * FROM `t_employee`
# 1. 查询每种性别的员工数量以及性别、平均工资
SELECT COUNT(*), gender, AVG(salary)
	FROM `t_employee`
	GROUP BY gender
# 2. 查询生日年份、性别相同的人数和平均工资
SELECT YEAR(birthday), COUNT(*), AVG(salary), gender
	FROM `t_employee`
	GROUP BY YEAR(birthday), gender
# 3. 查询工资高于5000， 每种性别的员工数量以及性别平均工资
SELECT COUNT(*),  AVG(salary), gender
	FROM `t_employee`
	WHERE salary>5000
	GROUP BY gender
# 4. 查询平均工资高于5000的性别和性别人数
SELECT gender, COUNT(gender), AVG(salary)
	FROM `t_employee`
	GROUP BY gender HAVING AVG(salary)>5000
```

## 分组后汇总

在语句最后加上关键字: WITH ROLLUP

```sql
# 示例
SELECT IFNULL(note, '合计'), SUM(num)
    FROM `books`
    GROUP BY note WITH ROLLUP
```


## 排序查询

排序不会影响结果，只是改变顺序

```sql
	ORDER BY 排序列 ASC(正序) 排序列2 DESC(倒序)
```

## 数据切割/分页查询

```sql
LIMIT 0, 10
```

## 查询篇总结

**1. 执行顺序：**

from => where => group by => having => select 字段 => order by => limit

**2. 关键字的顺序：**

selelct => from => where => group by => having => order by => limit

**3. 别名的使用:**

where后是不允许使用**列别名的**， 可以在**group by、having、order by**中使用。

---

### 综合大练习(单表查询)

```sql

	# 1. 创建数据库test_library
	SHOW DATABASES
	CREATE DATABASE IF NOT EXISTS test_library CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs
	USE `test_library`
	SELECT DATABASE()
	/* 2. 创建表 books ， 表结构为:
      	1. id int 主键自增
      	2. name varchar(50) 书名
      	3. author varchar(50)   作者
      	4. price decimal(10,2)  价格
      	5. pubdate datetime  出版日期
      	6. note varchar(255)    备注
      	7. num int 库存
	*/
	CREATE TABLE IF NOT EXISTS books(
		id INT COMMENT '主键自增',
		`name` VARCHAR(50) COMMENT '书名',
		author VARCHAR(50) COMMENT '作者',
		price DECIMAL(10, 2) COMMENT '价格',
		pubdate DATETIME COMMENT '出版日期',
		note VARCHAR(255) COMMENT '备注',
		num INT COMMENT '库存'
	)
	/*	3. 插入数据 
      	1. 不指定字段名称插入第一条
      	2. 指定字段名称插入第二条
      	3. 同时插入剩余条
      	4. 数据为：
         	1. 1, '深入浅出nodejs', '朴灵', 88.88, '2018-01-01', 'java入门', 10
         	2. 2, '你不知道的javascript', 'myself', 66.66, '2018-02-02', 'java入门', 20
         	3. 3, '深入 浅出java', 'myself', 99.99, '2018-03-03', 'java入门', 0
         	4. 4, '人间 失格', '太宰治', 55.55, '2018-04-04', '散文入门', 40
         	5. 5, '三 体', '辰东', 77.77, '2018-05-05', '科幻入门', 500
         	6. 6, '斗破苍穹', '天蚕土豆', 66.66, '2018-06-06', '玄幻入门', 600
         	7. 7, '出大主宰', '天蚕土豆', 66.66, '2018-07-07', '玄幻入门', 70
		*/
		DESC books
		INSERT INTO `books` VALUES(1, '深入浅出nodejs', '朴灵', 88.88, '2018-01-01', 'java入门', 10)
		INSERT INTO `books` (id, `name`, author, price, pubdate, note, num) VALUES(2, '你不知道的javascript', 'myself', 66.66, '2018-02-02', 'java入门', 20)
		INSERT INTO books VALUES
			(3, '深入 浅出java', 'myself', 99.99, '2018-03-03', 'java入门', 0),
			(4, '人间 失格', '太宰治', 55.55, '2018-04-04', '散文入门', 40),
			(5, '三 体', '辰东', 77.77, '2018-05-05', '科幻入门', 500),
			(6, '斗破苍穹', '天蚕土豆', 66.66, '2018-06-06', '玄幻入门', 600),
			(7, '出大主宰', '天蚕土豆', 66.66, '2018-07-07', '玄幻入门', 70)
   	#4. 将note为玄幻的图书的价格都加5元
   	UPDATE `books`
			SET price=price+5
			WHERE note='玄幻入门'
   	#5. 将三 体的价格改为9999， 说明改为玄幻入门
   	UPDATE `books`
			SET price=9999, note='玄幻入门'
			WHERE NAME='三 体'
   	#6. 删除库存为0的记录
   	DELETE
			FROM `books`
			WHERE num=0
   	#7. 统计书名包含了 '出'的书
   	SELECT *
			FROM `books`
			WHERE NAME LIKE '%出%'
   	#8. 统计书名中包含 '出'的书的数量和库存总量
   	SELECT SUM(num), COUNT(*)
			FROM `books`
			WHERE NAME LIKE '%出%'
   	#9. 找出类型为 玄幻入门 的图书，按照价格降序排列
   	SELECT *
			FROM `books`
			WHERE note='玄幻入门'
			ORDER BY price DESC
   	#10. 查询图书信息，按照库存降序， 如果库存相同按照价格升序
   	SELECT *
			FROM `books`
			ORDER BY num DESC, price ASC
   	#11. 按照分类统计书的数量
   	SELECT COUNT(*), note
			FROM `books`
			GROUP BY note
   	#12. 按照分类统计书的价格，显示库存超过100的
   	SELECT note, SUM(num)
			FROM `books`
			GROUP BY note HAVING SUM(num)>100
   	#13. 查询所有图书，每页5个，显示第二页
   	SELECT *
			FROM `books`
			LIMIT 5, 5
   	#14. 按照分类统计书的库存，显示库存最多的
   	SELECT SUM(num), note
			FROM `books`
			GROUP BY note
			ORDER BY SUM(num) DESC
			LIMIT 0, 1
   	#15. 书名长度超过5的，不包含空格
   	SELECT *
			FROM `books`
			WHERE CHAR_LENGTH(TRIM(`name`))>5
   	#16. 查询书名和类型， 其中分类为 玄幻入门 显示为 玄幻 , 科幻入门 显示为 科幻 java入门 显示为 java 散文入门 显示为 散文
   	SELECT `name`, 
			CASE note
				WHEN '玄幻入门' THEN '玄幻'
				WHEN '科幻入门' THEN '科幻'
				WHEN 'java入门' THEN 'java'
				WHEN '散文入门' THEN '散文'
				END
				AS '分类'
			FROM `books`
   	#17. 查询书名、库存， 超过30本库存的显示滞销， 大于0低于10的显示 畅销 ，0的显示缺货
   	SELECT `name`, num,
			CASE 
				WHEN num>30 THEN '滞销'
				WHEN num BETWEEN 0 AND 10 THEN '畅销'
				WHEN num=0 THEN '缺货'
				ELSE '畅销'
				END
				AS '销售情况'
			FROM `books`
   	#18. 统计每一种分类的库存，合计总量
   	SELECT IFNULL(note, '合计'), SUM(num)
			FROM `books`
			GROUP BY note WITH ROLLUP
   	#19. 统计每一种分类的数量，合计总量
   	SELECT IFNULL(note, '合计'), COUNT(*)
			FROM `books`
			GROUP BY note WITH ROLLUP
   	#20. 统计库存量前三的书
   	SELECT *
			FROM `books`
			ORDER BY num DESC
			LIMIT 0, 3
   	#21. 找出最早出版的书
   	SELECT *
			FROM `books`
			ORDER BY pubdate ASC
			LIMIT 0, 1
   	#22. 找出分类为玄幻入门的最贵价书
   	SELECT *
			FROM `books`
			WHERE note='玄幻入门'
			ORDER BY price DESC
			LIMIT 0, 1
   	#23. 找出字数最多的一本书，不包括空格
		SELECT *
			FROM `books`
			ORDER BY CHAR_LENGTH(TRIM(`name`)) DESC
			LIMIT 0, 1
```

# 数据库约束篇

## 概念

约束有表级别的规定和数据的规定， 主要作用是防止数据错误， 保证数据的正确性。

> 学习约束主要有三个方向：
> 作用约束、添加约束、删除约束

## 分类

约束分类有三种：

- 域(列)级约束: 只对列有效果，比如列不能为null
- 实体(行)级约束: 对比表中其他数据有关联，比如必须唯一
- 引用(多表)级约束: 对比表间关联，比如分数表必须有学生表的学号

> 列和行级约束可以理解为单表，另一个**引用约束**可以理解为多表

| 约束类型 | 描述 | 类别 |
| :--- | :--- | :--- |
| NOT NULL | 列非空 | 列级 |
| DEFAULT | 列默认值 | 列级 |
| CHECK | 检查自定义约束 | 列级 |
| PRIMARY KEY | 主键唯一且不为空 | 实体级 |
| UNIQUE | 某一列值唯一 | 实体级 |
| AUTO_INCREMENT | 自增 | 实体级 |
| FOREIGN KEY | 某一列正确引用其他表数据值 | 引用级 |

### 非空约束

```sql
-- 非空约束
SHOW TABLES FROM `test_library`
# 1. 创建表添加
CREATE TABLE null_table(
	e_name VARCHAR(50) NOT NULL,
	e_age INT
)
DESC null_table
# 2. 创建表以后修改
ALTER TABLE null_table MODIFY e_age INT NOT NULL
# 3. 删除非空约束
ALTER TABLE null_table MODIFY e_age INT NULL
ALTER TABLE null_table MODIFY e_name VARCHAR(50)
```

### 默认值约束

**默认值不可以设置在主键或者唯一约束上**

```sql
# 创建时设置默认值
CREATE TABLE null_table2(
	e_name VARCHAR(50) DEFAULT 'xx' NOT NULL,
	e_age INT
)
# 创建后修改默认值
ALTER TABLE null_table2 MODIFY e_age DEFAULT 20
# 取消默认值
ALTER TABLE null_table MODIFY e_name INT NULL
```

### 检查约束

**是在表级别上进行的约束**

不推荐使用检查约束，而是将检查代码放在业务程序代码上.

```sql
# 创建表设置
CREATE TABLE null_table3(
	gender CHAR,
	CHECK(gender IN ('女','男')),
	age INT
)
# 修改表设置
ALTER TABLE null_table3 ADD CONSTRAINT age_check CHECK(age > 18)
# 删除约束
ALTER TABLE null_table3 DROP CONSTRAINT age_check
# 查看约束
SELECT *
	FROM information_schema.table_constraints
	WHERE table_schema='test_library' AND TABLE_NAME='null_table3'
```

### 唯一约束

> 1. 同一个表可以有多个唯一约束
> 1. 唯一性约束可以为空
> 1. 不给唯一约束命名，默认是列名

```sql
# 创建表设置1
CREATE TABLE uni_check1(
	e_name VARCHAR(20),
	# 列后直接写
	e_phone VARCHAR(11) UNIQUE,
	e_parent VARCHAR(4) UNIQUE KEY,
	e_class CHAR,
	# 分开写
	UNIQUE KEY(e_class),
	# 组合唯一 且设置约束名
	CONSTRAINT parent_uniunique UNIQUE KEY(e_parent, e_phone)
)

# 修改表设置
ALTER TABLE uni_check1 ADD CONSTRAINT e_calss2 UNIQUE KEY(e_class)
# 删除约束
ALTER TABLE uni_check1 DROP CONSTRAINT e_class
# 查看约束
SELECT *
	FROM information_schema.table_constraints
	WHERE table_schema='test_library' AND TABLE_NAME='uni_check1'
```

### 主键约束

#### 主键概念

**主键**是确保行数据至少有一列是不重复的， 避免了整行数据的不重复。 **永远不重复且不会为null的列**，可以称为**主键**

如： 学号、身份证号等等。

#### 主键分类

有自定义主键(人为创建)和自然主键(数据实体自带的属性列)

#### 主键细节

1. 只能一个
2. 单个或多个列构成
3. 任意类型，唯一且不为null
4. 采用identity主键单词缩写id
5. 创建主键，系统默认在主键建立对应**主键索引**，效率高
6. 主键不一定要添加主键约束，没有主键约束也可以是主键，但是不安全

#### 主键约束设置

```sql
# 创建表添加
CREATE TABLE id_table(
	eid INT PRIMARY KEY
)
CREATE TABLE id_table2(
	eid INT,
	CONSTRAINT id_check PRIMARY KEY(eid)
)
DESC id_table
# 修改表
ALTER TABLE id_table ADD PRIMARY KEY(eid)
# 删除主键
ALTER TABLE id_table DROP PRIMARY KEY
```

### 自增长约束

限定**整数列**字段，值自动增长。

#### 特点

1. 只能添加到键列(主键、唯一)
2. 每一张表只能有一个自增长约束
3. 必须整数类型
4. 设置了0或者null，会自增长赋值， 如果是非空，那么就是真实赋值

#### 自增长约束设置

```sql
# 创建表 主键自增长
CREATE TABLE incre(
	eid INT PRIMARY KEY AUTO_INCREMENT,
	ename VARCHAR(100)
	# 设置自增长的默认值
) AUTO_INCREMENT = 100
DESC incre
SELECT * FROM incre
INSERT INTO incre (ename) VALUES('lx')
# 创建表唯一列自增长
CREATE TABLE incre2(
	ecode INT UNIQUE KEY AUTO_INCREMENT
)
# 修改表
DROP TABLE IF EXISTS incre3
CREATE TABLE incre3(
	eids INT PRIMARY KEY
)
ALTER TABLE incre3 MODIFY eids INT AUTO_INCREMENT=100
# 删除自增长
ALTER TABLE incre3 MODIFY eids INT
```

### 多表(引用)(外键)约束

#### 外键概念

引用其他表主键列的值，称为**外键**。

**外键约束**是外键应该引用的值，必须确保正确引用外键的限制。

#### 外键约束细节

1. 每个表可以有多个外键约束
2. 外键是跨表引用， 被引用的是**主表**，外键表为**子表**
3. 外键**不能是**任意类型，应该和**主键类型**对应，尽量命名相同
4. **关系型**数据库的关系就是**主外键关系**
5. 存在外键约束， 删除主表数据时，会因为子表有引用而删除失败。

#### 外键约束设置

```sql
# 创建表设置
CREATE TABLE student(
	sid INT PRIMARY KEY AUTO_INCREMENT,
	sname VARCHAR(20)
)
CREATE TABLE score(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	`number` INT,
	sid INT,
	CONSTRAINT s_s_1_fk FOREIGN KEY (sid) REFERENCES student(sid)
)
SELECT *
	FROM information_schema.table_constraints
	WHERE table_schema='test_library' AND TABLE_NAME='score'
# 修改表后设置
CREATE TABLE student2(
	sid INT PRIMARY KEY AUTO_INCREMENT,
	sname VARCHAR(20)
)
CREATE TABLE score2(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	`number` INT,
	sid INT
)
SELECT *
	FROM information_schema.table_constraints
	WHERE table_schema='test_library' AND TABLE_NAME='score2'
ALTER TABLE score2 ADD CONSTRAINT s_s_2_fk FOREIGN KEY (sid) REFERENCES student2(sid)
# 删除外键约束
	# 第一步 删除外键约束
	ALTER TABLE score2 DROP FOREIGN KEY s_s_2_fk
	# 第二步 删除外键索引
	SHOW INDEX FROM score2
	ALTER TABLE score2 DROP INDEX s_s_2_fk
```

#### 约束等级设置

| 约束等级 | 描述 |
| :-: | :--: |
| Cascade | 父表update/delete，子表同步匹配的记录 |
| Set null | 父表update/delete, 子表匹配记录的列设为null， 但是子表的外键列不能为not null |
| no action | 子表有匹配记录，不允许对父表进行update/delete操作 |
| restrict | 父表update/delete，子表有匹配记录，不允许对父表进行update/delete操作，同no action |
| set default | 父表update/delete，子表匹配记录的列设为默认值，有的不识别 |

最好是：**on update cascade on delete restrict**, update时同步，删除时立即检查。

```sql
	ALTER TABLE score2 
		ADD CONSTRAINT s_s_2_fk 
			FOREIGN KEY (sid) REFERENCES student2(sid)
			ON UPDATE CASCADE
			ON DELETE RESTRICT
```

### 约束常见问题

#### 1. 建立和不建立外键约束的区别

建立外键约束，操作会收到语法层面的限制，例如在员工表中给予了一个不存在的部门主键

#### 2. 建立和不建立外键约束对于查询的影响

没有， 可能会影响查询效率和速度

#### 3. 表中字段为什么不想要null的值

1. 不好比较，只能使用is null和is not null比较
2. 效率不高，影响索引效果

#### 4. auto_increment是从1开始的吗

是的， 且是可以设置默认值的

#### 5. 是不是表可以跨存储引擎

不， 默认是innodb， 但是可以设置其他引擎。

有外键约束的表不可以跨引擎

#### 6. 创建数据库时会给表添加完备的约束

不会，一般只会添加一些简单的域和实体约束。

阿里开发规范规定: **不得使用外键与级联， 一切外键概念在应用层解决**

# 数据库多表关系篇

## 拆表的概念

1. 关系型数据库， 数据都是按照类别存储
2. 表与表通过主外键关系关联
3. 减少数据的冗余， 提高数据查询和操作效率
4. 通过分析数据关系，添加合理的约束

## 多表关系概念

多表关系，其实只是两个表之间的关系。 

可以有： 
- 一对一行
  - 学生和他的档案信息
- 一对多行
  - 作者和多个文章
- 多行对多行
  - 大学生选修多门课，一门课有多个学生
  - 需要创建一个**中间表**连接起来

## 一对一实现

一对一是并不能解决数据冗余问题，因为可以融合为一行。

主要是解决分开存放**热冷数据**

通过**子表外键唯一约束**或者**两表共用一个主键**

```sql
-- 一对一 员工和档案表
CREATE TABLE emp(
	eid INT PRIMARY KEY AUTO_INCREMENT,
	ename VARCHAR(22) NOT NULL,
	eage INT DEFAULT 18 NOT NULL,
	egender SET('男', '女') DEFAULT '男' NOT NULL
)
DESC emp
# 外键约束 + 唯一
CREATE TABLE profile1(
	pid INT PRIMARY KEY AUTO_INCREMENT,
	paddress VARCHAR(100) NOT NULL,
	plevel INT DEFAULT 12 NOT NULL,
	# 外键唯一
	eid INT UNIQUE KEY,
	# 外键约束
	CONSTRAINT p_s_id FOREIGN KEY(eid) REFERENCES emp(eid)
)

# 外键直接当主键
CREATE TABLE profile2(
	pid INT PRIMARY KEY,
	paddress VARCHAR(255) NOT NULL,
	plevel INT DEFAULT 10 NOT NULL,
	CONSTRAINT s_p_2 FOREIGN KEY(pid) REFERENCES emp(eid)
)
```

## 一对多实现

一对多可以解决数据冗余问题。

一个实体对应多个子元素， 解决数据冗余和操作效率。

子表外键数据可以重复(外键不唯一)

```sql
-- 一对多实现
# 创建作者表
CREATE TABLE author(
	aid INT PRIMARY KEY AUTO_INCREMENT,
	aname VARCHAR(255) NOT NULL
)
# 创建文章表
CREATE TABLE bolgs(
	bid INT PRIMARY KEY AUTO_INCREMENT,
	btitle VARCHAR(245) NOT NULL,
	aid INT,
	CONSTRAINT b_a_id FOREIGN KEY(aid) REFERENCES author(aid)
)
```

# 多表查询

多表查询按照多表合并的方向可以分为： 水平合并和垂直合并。

垂直合并语法: union/union all， 不要求主外键

水平合并语法: 连接查询，要求主外键

## 垂直合并

垂直合并语法有两种：**union/union all**

union是去重， union all不去重。

> 合并的结果集**列数、类型必须相同**

```sql
SELECT aid, aname FROM a
UNION 
SELECT bid, bname FROM b
UNION 
SELECT cid, cname FROM c

SELECT aid, aname FROM a
UNION ALL
SELECT bid, bname FROM b
UNION ALL
SELECT cid, cname FROM c
```

## 连接查询(水平合并)

### 内连接

```sql
# 标准
SELECT  a.aid, a.aname, a.bid, b.bid, b.bname
	FROM a
		INNER JOIN b ON a.bid=b.bid
		# 附加条件
		WHERE b.bid>10
# 非标准
SELECT  a.aid, a.aname, a.bid, b.bid, b.bname
	FROM a, b
	WHERE a.bid=b.bid
```
---
**N表内连接**

```sql
# 标准
SELECT  a.aid, a.aname, a.bid, b.bid, b.bname
	FROM a
		INNER JOIN b ON a.bid=b.bid
		INNER JOIN c ON b.cid=c.cid
		# ...
	# 附加条件
	WHERE b.bid>10
# 非标准
SELECT  a.aid, a.aname, a.bid, b.bid, b.bname
	FROM a, b, c
	WHERE a.bid=b.bid and b.cid=c.cid
```

#### 细节

1. 必须增加主外键的相等条件，防止笛卡尔积导致数据错误
2. 注意给表格别名来避免字段名冲突
3. 必须满足**主外键相等**

### 外连接

```sql
SELECT e.eid, e.ename, d.dname
	FROM t_employee AS e
		LEFT JOIN t_department AS d ON e.eid=d.did
		LEFT JOIN t_job AS j ON e.jid=j.jid
	WHERE e.eid>10
		
SELECT e.eid, e.ename, d.dname
	FROM t_department AS d
		RIGHT JOIN t_employee AS e ON e.eid=d.did
```

#### 细节

1. 外连接可以通过左右指定一个逻辑主表， 逻辑主表一定可以查到
2. 外连接的outer可以省略。
3. 逻辑主表放左边，使用left join那么本次查询全部为左外连接


### 自然连接

内外连接的升级版， 自动找到两个表中相同的列名，判定相等。

**如果主键外存在相同列名，那么数据也会判定列是否相等**

```sql
# 内自然连接
SELECT a.id, b.bname, b.id
		FROM a
			# 省略on using指定相同的主外键列名
			NATURAL INNER JOIN b USING(id)
# 左外连接
SELECT e.eid, e.ename, d.dname
	FROM t_employee AS e
		NATURAL LEFT JOIN t_department AS d
	WHERE e.eid>10
```

### 自连接用法(自己连接自己)

```sql
# 自连接 查询编号为5的自己信息和领导名字和领导的领导名字
SELECT my.id, my.name, my.mid, top.name 
	FROM t_employee AS my
		LEFT JOIN t_employee AS top ON my.mid=top.id
		LEFT JOIN t_employee AS top2 ON top.mid=top2.id
		WHERE my.id=5
```

#### 细节

1. 自连接不是一种语法，是一个**自己连接自己**的一种概念，一种逻辑
2. 依靠内连接、外连接、自然连接的语法实现
3. 一个表存在引用关系， 需要再次查询自己
   - 员工表中有全部的员工， 需要查询自己和领导的编号
   - 领导的编号信息不在别的地方，而是也在这张表中

## 子查询

在sql中(不论是select、update、insert、delete)嵌套了另一个完整的**select语句**。


## 高级特性




