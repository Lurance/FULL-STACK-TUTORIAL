// // 回调是异步编程最基本的方法。
//
// // 假定有两个函数f1和f2，后者等待前者的执行结果。如果f1是一个很耗时的任务，可以考虑改写f1，把f2写成f1的回调函数
//
// // function f1(callback) {
// //     setTimeout(function () {
// //         callback();
// //     }, 1000)
// // }
// //
// // f1(f2);
//
// // 采用这种方式，我们把同步操作变成了异步操作，f1不会堵塞程序运行，相当于先执行程序的主要逻辑，将耗时的操作推迟执行。
// // 回调函数的优点是简单、容易理解和部署，缺点是不利于代码的阅读和维护，各个部分之间高度耦合，流程会很混乱，而且每个任务只能指定一个回调函数。
//
// // Promises对象是CommonJS工作组提出的一种规范，目的是为异步编程提供统一接口。
// // 简单说，它的思想是， 每一个异步任务返回一个Promise对象，该对象有一个then方法，允许指定回调函数。
// // Promises的出现大大改善了异步编程的困境，避免出现回调地狱，嵌套层级得到改善
//
//
// // 以下是两个基本的异步请求
//
function getData1() {
    return new Promise(((resolve, reject) => {
        setTimeout(() => {
            console.log('1执行了');
            resolve('请求到模拟数据1111')
        }, 2000)
    }));
}

function getData2(params) {
    return new Promise(((resolve, reject) => {
        setTimeout(() => {
            console.log('2执行了');
            resolve('请求到模拟数据2222' + params)
        }, 2000)
    }));
}
//
// // promise 实现异步回调 异步列队
// // 1请求完成后，把1的响应参数传入2，在发2请求
//
// getData1()
//     .then(res => {
//         return getData2(res);
//     })
//     .then(res => console.log(res));
//
// // 1执行了
// // 2执行了
// // 请求到模拟数据22222拉！params：请求到模拟数据1111拉   用时 3500 ms
//
//
// // promise.all() 实现异步回调 并发 所有的完成
// // 1请求、2请求同时发,两条响应都收到后在执行
// Promise.all([getData1(), getData2()])
//     .then(res => console.log(res));
//
// // 2执行了
// // 1执行了
// // ["请求到模拟数据1111拉", "请求到模拟数据22222拉！params：undefined"]   用时 2000 ms
//
//
// // promise.race() 实现异步回调 并发 竞速
// // 1请求、2请求同时发，其中一条收到请求就执行
// Promise.race([getData1(), getData2()])
//     .then(res => console.log(res));
//
// // 2执行了
// // 请求到模拟数据22222拉！params：undefined    用时 1500 ms
// // 1执行了
//
//
//
//
// // Async/await 是Javascript编写异步程序的新方法。以往的异步方法无外乎回调函数和Promise。但是Async/await建立于Promise之上。
//
// async function timeout(ms) {
//     await new Promise(resolve => setTimeout(resolve, ms))
// }
//
// async function asyncPrint(value, ms) {
//     await timeout(ms);
//     console.log(value);
// }
//
// asyncPrint('hello world', 3000);
//
// // 进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖
//
// // 改写
// // getData1()
// //     .then(res => {
// //         return getData2(res);
// //     })
// //     .then(res => console.log(res));
//
//
// async function asyncDemo() {
//     const r1 = await getData1();
//     const r2 = await getData2(r1);
//     console.log(r2);
// }

// 1执行了
// 2执行了
// 请求到模拟数据22222拉！params：请求到模拟数据1111拉   用时 3500 ms


//假如我们有一种这样的业务需求，并发两个请求，但是要规定收到请求的顺序应该怎么做的？

async function asyncDemo2 () {
    const arr = [getData1, getData2];
    const textPromises = arr.map(async (doc) => await doc());
    console.log(textPromises);
    for (const textPromise of textPromises) {
        console.log(await textPromise);
    }
}

asyncDemo2();

// 代码中，虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响
