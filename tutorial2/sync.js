// javscript是单线程执行的

// 按照代码文档顺序从上到下执行

// 所以如果上一个操作耗时过长，比如发起请求，读写大文件等等， 那么下一个进程会被阻塞

const fs = require('fs')

function longTimeFun() {
    for (let i=0; i < 60000; i++) {
        fs.appendFileSync(__dirname + '/testasync.txt', 'Long Time\n')
    }
}

function a() {
    console.log('Fun a called')
}

function b() {
    console.log('Fun b called')
}

longTimeFun()

a()

b()

// 可以看到经过了比较长的时间才执行函数a和函数b，也就是说，函数a和函数b被函数longTimeFun给阻塞了