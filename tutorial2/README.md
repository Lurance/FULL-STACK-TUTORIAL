# Part One

Tutorial2主要讲了JavaScript的运行原理，并由此引出了同步异步的概念继而讲到了Promise

sync.js 和 async.js搭配食用

sync.js是同步的版本，我们实现了一个耗时特别长的任务，往一个文件写入60000万行字符串导致之后的代码被阻塞

async.js是异步的版本，可以看到后面的代码并没有被阻塞


# Part two

promise.js是讲解了关于JavaScript Promise一个重要的库，它解决了回调函数的诸多不便得以更好的方式来处理异步代码。同时大量的JavaScript库都与此概念有关


# Part Three

promise_async.js是拓展课程，讲解了比较新的（ES7）async以及await的概念，这种语法可以将异步代码当成同步任务一样来写（实现），本质算是一个语法糖，其广泛运用于流行的NodeJs后端构建框架，例如koa和Express