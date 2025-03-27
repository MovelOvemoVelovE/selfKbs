文件系统 Api 作为 nodejs 的核心模块非常重要， 可以读取文件内容，操作文件。

无论是作为日常 nodejs 小脚本， 还是作为`Nextjs`的文件路由框架都是核心概念。

## 写入文件

**应用场景：**

1. 下载文件
2. 安装 app
3. 保存日志
4. 编辑器保存
5. 保存视频、录屏等

### writeFile()

写入文件

> `fs.writeFile(fileName, data[, options], callback)`
>
> callback 参数为 error，失败为 error 对象，成功则为 null

### writeFileSync()

同步写入文件

> `fs.writeFileSync('./output/data.txt', '同步写入文件')`

### appendFile()

参数同 writeFile。**是在文件的后面追加写入。**

### appendFileSync()

同步的`appendFile`

### createWriteStream()

创建文件写入流。通过**返回的流对象**`write、close`方法进行系列操作。

> **特点:**
>
> - 减少打开、关闭文件的次数。
> - 适合大文件写入、频繁写入等操作

```js
const fs = require("fs");
/* 写入流对象 */
const ws = fs.createWriteStream("./座右铭.txt");
ws.write("锄禾日当午\r\n");
// 销毁流对象
ws.close();
```

## 读取文件

### readFile

读取文件

> `fs.readFile(path[, options], callback)`  
> `callback`接受两个参数为`err`、`Buffer`类型的`data`

```js
const fs = require("fs");
fs.readFile("./座右铭.txt", (err, data) => {
  console.log(err, data.toString());
});
```

### readFileSync

> `const res = fs.readFileSync(path[,options])`  
> `res`是读取到的`Buffer`类型数据

```js
let a = fs.readFileSync("./data.txt");
console.log(a.toString());
```

### createReadStream

创建读取流，读取文件。通过**返回的流对象**，绑定`data`和`end`等**事件**进行读取。

> `const rs = fs.createReadStream(path)`

```js
// chunk为读取的 文件块
rs.on("data", (chunk) => {
  console.log(chunk); // Buffer数据 64kb
});
// 结束事件，读取完成后触发
rs.on("end", (_) => {
  console.log("读取结束");
});
```

### pipe

> `fs.createReadStream().pipe(fs.createWriteStream())`  
> 读取流，将数据通过 pipe(管道)传输给后者的写入流，完成复制。

### DEMO-复制文件

通过`fs`的读写 api 进行复制文件：

```js
const fs = require("fs");

// 方法一 同步读取文件后, 同步写入文件，完成复制
let data = fs.readFileSync("./output/data.txt");
fs.writeFileSync("./res/data2.txt", data);

// 方法二 异步操作
fs.readFile("./output/data.txt", (err, data) => {
  if (err) throw err;
  fs.writeFileSync("./res/data4.txt", data);
});

// 方法三 创建流，读取流读取，写入流写入完成复制
let rs = fs.createReadStream("./output/data.txt");
const ws = fs.createWriteStream("./res/data3.txt");
rs.on("data", (chunk) => {
  ws.write(chunk);
});
rs.on("end", (_) => {
  console.log("复制完成");
});
```

### 重命名/移动文件

> 重命名就是修改文件的路径，同样的路径换了 fileName 就是重命名，不同的路径则是移动文件  
> 异步修改：`fs.rename(path, newPath, callback)`  
> 同步修改：`fs.renameSync(path, newPath)`

```js
// 同步重命名
fs.renameSync("./output/data.txt", "./output/dataRename.txt");
// 移动文件
fs.rename("./output/dataRename.txt", "./res/dataRename.txt", (err) => {
  if (err) throw err;
});
```

### 删除文件

#### unlink/unlinkSync

> 异步：`fs.unlink(path, err => void)`  
> 同步：`fs.unlinkSync(path)`

#### rm/rmSync

> 异步：`fs.rm(path, err => void)`  
> 同步：`fs.rmSync(path)`

## 文件夹读写删

| 方法名                                          | 描述                       |
| ----------------------------------------------- | -------------------------- |
| `fs.mkdir(path[, option], err=>void)`           | 创建文件夹                 |
| `fs.readdir(path[, option], (err, data)=>void)` | 读取文件夹                 |
| `fs.rmdir(path[, option], err=>void)`           | 删除文件夹(推荐使用`rm()`) |
| `fs.mkdirSync(path[, option])`                  | **同步操作**创建           |
| `fs.readdirSync(path[, option])`                | **同步操作**读取           |
| `fs.rmdirSync(path[, option])`                  | **同步操作**删除           |

## 查看文件状态

> 同步: `const res = fs.statSync(path[,options])`  
> 异步: `fs.stat(path[, options], (err, data) => void)`

其中 `callback`参数的`data`，可以使用`data.isFile()`和`data.isDirectory()`返回的`boolean` 查看是否为文件、文件夹

## 文件路径

在 nodejs 中，js 文件内写入的**相对路径**是根据命令行所在目录的**上下文**来进行执行。

```js
// nodejsDemo/a/file1.js目录下写入
const writeContent = '我想要在a目录下写入一个文件'
fs.writeFileSync('./文件路径bug.txt', writeContent)
// 命令行
cd nodejsDemo
node file1.js

cd nodejsDemo/b
node ../a/file1.js
```

> 以上代码： 我们原本想要在 a 目录下写入一个新的文件，在根目录下 node 编译会正确，但是切换到其他目录然后执行 js 文件，输出文件会根据命令行上下文环境寻找`./`。
>
> 类似于 this 指向的问题。所以就需要使用**绝对路径**保证我们路径这里的绝对正确。

### \_\_dirname

> `cconsole.log(__dirname == 'D:\\demo\\architect-trip\\nodejs') // true`

**当前 js 文件目录**的绝对路径

### \_\_filename

> `console.log(__filename == 'D:\\demo\\architect-trip\\nodejs\\9-文件路径.js') // true`

**当前文件**的绝对路径
