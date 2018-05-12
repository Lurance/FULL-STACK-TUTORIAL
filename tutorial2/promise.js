// 回调函数是一段可执行的代码段，它以「参数」的形式传递给其他代码，在其合适的时间执行这段（回调函数）的代码
// 回调函数不仅可以用于异步调用，一般同步的场景也可以用回调。
// 在同步调用下，回调函数一般是最后执行的。而异步调用下，可能一段时间后执行或不执行（未达到执行的条件）。


// Promise对象代表一个未完成、但预计将来会完成的操作
// pending：初始值，不是fulfilled，也不是rejected
// fulfilled：代表操作成功
// rejected：代表操作失败
// Promise有两种状态改变的方式，既可以从pending转变为fulfilled，也可以从pending转变为rejected。
// 一旦状态改变，就「凝固」了，会一直保持这个状态，不会再发生变化。当状态发生变化，promise.then绑定的函数就会被调用。
// 注意：Promise一旦新建就会「立即执行」，无法取消。这也是它的缺点之一

let promise = new Promise(function (resolve, reject) {
    if (Math.random() > 0.5) {
        resolve('Ok')
    } else {
        reject('Fail');
    }
});

// resolve函数的作用：在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
// reject函数的作用：在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去

// Promise实例生成以后，可以用then方法指定resolved状态和reject状态的回调函数。

promise.then(function (data) {
    console.log(data); // OK
}, function (data) {
    console.log(data); // FAIL
});

// then方法会返回一个Promise。它有两个参数，分别为Promise从pending变为fulfilled和rejected时的回调函数（第二个参数非必选）。这两个函数都接受Promise对象传出的值作为参数。
// 新建Promise中的'resolve('OK')'，则相当于执行resolveFun函数。
// Promise新建后就会立即执行。而then方法中指定的回调函数，将在当前脚本所有同步任务执行完才会执行

// 基本API

// .then()
// 对promise添加onFulfilled和onRejected回调，并返回的是一个新的Promise实例（不是原来那个Promise实例），且返回值将作为参数传入这个新Promise的resolve函数。


// .catch()
// 该方法是.then(undefined, onRejected)的别名，用于指定发生错误时的回调函数

// promise.then(function(data) {
//     console.log('success');
// }).catch(function(error) {
//     console.log('error', error);
// });
//
// /*******等同于*******/
// promise.then(function(data) {
//     console.log('success');
// }).then(undefined, function(error) {
//     console.log('error', error);
// });


// .all()
// 该方法用于将多个Promise实例，包装成一个新的Promise实例。

let p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 3000, 'First');
});

let p2 = new Promise(function (resolve, reject) {
    resolve('second');
});

let p3 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 1000, 'third');
});

Promise.all([p1, p2, p3])
    .then(function (values) {
        console.log(values); // [ 'First', 'second', 'third' ]
    });

// 当p1, p2, p3状态都变为fulfilled，p的状态才会变为fulfilled，并将三个promise返回的结果，按参数的顺序（而不是 resolved的顺序）存入数组，传给p的回调函数
// 当p1, p2, p3其中之一状态变为rejected，p的状态也会变为rejected，并把第一个被reject的promise的返回值，传给p的回调函数

let p4 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 3000, 'one');
});

let p5 = new Promise(function (resolve, reject) {
    setTimeout(reject, 2000, 'two');
});

let p6 = new Promise(function (resolve, reject) {
    reject('three')
});

Promise.all([p4, p5, p6])
    .then(function (value) {
        console.log('resolve', value);
    }, function (err) {
        console.log('reject', err); // reject three
    });

// 多个 promise 是同时开始、并行执行的，而不是顺序执行。从下面例子可以看出。如果一个个执行，那至少需要 1+32+64+128

function timerPromisefy(delay) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(delay);
        }, delay)
    });
}

let startDate = Date.now();

Promise.all([
    timerPromisefy(1),
    timerPromisefy(32),
    timerPromisefy(64),
    timerPromisefy(128)
]).then(function (value) {
    console.log(Date.now() - startDate + 'ms'); //133ms
    console.log(value); // [1,32,64,128]
});