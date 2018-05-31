// 通过setTimeout可以以人物队列的方式让一个同步操作异步化

// 承接sync.js的例子

const fs = require('fs')

function longTimeFun() {
    setTimeout(() => {
        for (let i=0; i < 60000; i++) {
            fs.appendFileSync(__dirname + '/testsync.txt', 'Long Time\n')
        }
    })
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

// 可以看到函数a和函数b并没有被阻塞而是立即执行了

// 在含有异步操作的代码逻辑中，js永远都是先执行同步操作，如果没有错误或者没有进入死循环再执行异步操作

