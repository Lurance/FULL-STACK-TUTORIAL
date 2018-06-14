# 函数式编程（fp）inJavaScript

不同于人们比较熟悉的命令式编程，如面向对象编程（oop），函数式编程（fp）是一种更加抽象，更加‘数学’的编程方式。
当然，也是一种更加‘痛苦’的编程方式，尤其是刚接触时，总是难以摆脱的命令式的思维方式，大脑回路总是会迷路。
不过幸运的是，javascript天生具备了函数式编程的基本元素，所以学习的起点不会太低。

## 两个比较（获得字符串"番茄炒蛋"）

### 面向对象

```javascript
Class Chef {
  cook(m1,m2){
    return m1+m2
  }
}
chef = new Chef()
food = chef.cook('番茄','鸡蛋')
food //番茄炒蛋。
```

### 函数式

```javascript
getMaterial(m){
  return function(){
    return m
  }
}
cook(getM1,getM2){
  return getM1()+getM2()
}
food = cook(getMaterial('番茄'),getMaterial('鸡蛋'));
food //番茄炒蛋
```

### 核心区别

来具体分析下两种的执行思路

对于第一种

> 1. 你面前出现了一个厨师
> 2. 你前面出现了番茄，鸡蛋
> 3. 厨师把番茄和鸡蛋炒在一起
> 4. 厨师把番茄炒蛋装在盘子上
> 5. 你获得了番茄炒蛋

对于第二种

> 1. 你拿一个空盘子，你决定弄点东西在上面
> 2. 你面前出现了一个厨具。
> 3. 你虽然没有材料，但幸运的是，你有两张藏宝图，分别标示了番茄和鸡蛋的位置。通过藏宝图，就能找到所需的材料。
> 4. 你把两张藏宝图扔到厨具里，告诉它，它得自己去找材料。
> 5. 厨具获得了番茄
> 6. 厨具获得了鸡蛋
> 7. 厨具终于炒了番茄和鸡蛋
> 8. finally,你获得了番茄炒蛋

对比一下这个过程，可以发现：

面向对象方式总是是在告诉系统，第一步应该干什么（搞个厨师）然后干什么（弄到番茄和鸡蛋）、按部就班，最后你就能得到想要的值（番茄炒蛋）。

函数式方式呢，恰恰相反，它是惰性的。只有你需要什么的时候，函数才会运算，才会返回数值，而不是一开始就存在的。

就好像学渣考90分，是因为在考试之前，他努力学习，到了90分。

这是结果。

而学霸考90分，只是因为考试的时候，做到90分时，懒癌发作，不想做题了。

这是过程。

## fp的特性

这里列举了当前接触到fp中编程思想中的几个重要特性

> * 不可变数据
> * 函数是一等公民，即能作为参数，也可以是返回值
> * 惰性求值

### 不可变数据

由于fp中都是函数，为了保证程序的可靠性，同样的参数，传入同一套的函数中，必须保证结果也是一样的。如：

```javascript
let o = {name:'Niang'};
r1 = fn1(fn2(fn3(o)))
r2 = fn1(fn2(fn3(o)))
r1 === r2 //true
```

在javascript中的由于Array和Object的类型都是引用传递的。如果在函数内部改变了改变了原始o的值，那么改变了原始o的值，那么必然导致r1和r2的结果不一样。导致程序不可靠，不可维护。
这是javascript的特性引起的，需要额外的手段补救。

**每次传递Object和Array时候，都做一个拷贝，使用拷贝后的对象作为函数参数**

或者使用某些数据结构工具，例如Facebook的的[immutable-js](或者使用某些数据结构工具，例如F家著名的immutable.js)

## 函数是一等公民

javascript天然满足，常见的各种回调。

```javascript
function doSomethingAndRunFun(fn, args) {
  // ...
  fs.readFile('')
  fn(args)
}

doSomethingAndRunFun(function() {
  console.log('Done')
})
```

## 惰性求值

顾名思义，只有在需要用到的才去计算。这里强行设定一种情景，如一个加法函数:

没有惰性求值：

```javascript
function add(n1,n2){
  if(n1<5){
    return n1
  }else{
    return n1+n2
  }
}
result = add(add(1,2),add(3,4)) //相当于add(3,4)的计算是浪费的。
result//3
```

惰性求值:

```javascript
function add(n1,n2){
  return n1+n2;
}
function preAdd(n1,n2){
  return function(){
    return add(n1,n2)
  }
}
function doAdd(fn1,fn2){
  n = fn1()
  if(n<5){
    return n     //只需要运行fn1，得到一个计算结果即可。
  }else{
    return add(fn1,fn2())
  }
}
result = doAdd(preAdd(1,2),preAdd(3,4))
result//10
```

对比一下可知，在javascript中的惰性求值，相当于先把参数先缓存着，return一个真正执行的计算的函数，等到需要结果采去执行。
这样的好处在于比较节省计算，尤其有时候这个在函数是不一定需要这个参数的时候。
