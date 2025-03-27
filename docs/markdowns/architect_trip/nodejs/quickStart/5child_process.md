`node:child_process`提供了`C`语言的`popen(3)`库的类似功能， 启动子进程。

核心的能力主要是由`child_process.spawn()`提供。

```js
const child_process = require('child_process');
const spawn = child_process.spawn
// 执行系统命令cmd [执行后退出、列出目录内容， 目录路径]
const ls = spawn('cmd', ['/c', 'dir', '/D']);
ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});
ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});
ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

而`child_process`中有以下属性：

```shell
{
  _forkChild: [Function: _forkChild],
  ChildProcess: [Function: ChildProcess],
  exec: [Function: exec],
  execFile: [Function: execFile],
  execFileSync: [Function: execFileSync],
  execSync: [Function: execSync],
  fork: [Function: fork],
  spawn: [Function: spawn],
  spawnSync: [Function: spawnSync]
}
```

## spawn

`spawn()`方法提供了启动子进程，不回阻塞`nodejs`的事件循环， 而`spawnSync()`**是会阻塞**

为了方便，`nodejs`提供了替代方案:

- `exec()`:  `shell`中执行命令，将`stdout`和`stderr`传递给回调函数
- `execFile()`： 类似于上，默认**不启动`shell`而是执行命令**
- `fork()`: 调用一个指定模块，允许父子进程通信的IPC通道
- `execSync() execFileSync()`同步版本，会阻塞事件循环。

这些方法都遵循`nodejs`的编码规范，返回一个`child_process`实例，父进程可以注册监听事件。

:::tip
`exec`和 `execFile`还允许指定一个可选`callback`函数，子进程终止时候调用。
:::

## window启动`.bat`和`.cmd`文件

在UNIX上，这两种文件是可以直接运行的，所以一般都是使用`execFile(.cmd)`文件，不需要多启动`shell`终端。

而Windows上，需要使用`spawn()`并传递更多的选项来执行文件

```js
const bat = spawn('my bat.cmd', ['-c', 'echo hello'], { shell: true });
```

