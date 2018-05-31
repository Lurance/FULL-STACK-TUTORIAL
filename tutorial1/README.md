# 运行

首先需要安装Node.js环境

在当前目录执行
```
npm i
npm run start
```
服务将开启于9000端口


# 目录结构

```
store   ------------------- 模拟存储
   |
   |
   |---  laf.db ----------- laf数据
   |
   |
   |———   laf.js ---------- 模拟数据库，数据存放在内存，程序则消失
   |
   |
   |———   laf_plus.js ----- 基于文件的模拟数据库，laf存储于laf.db中，持久化存储


admin.html ---------------- 填写laf页面 GET /admin
index.html ---------------- 首页展示所有的lafs
index.js   ---------------- WebService

test    ------------------- 测试用例
   |
   |--- mocha.opts -------- mocha配置文件
   |
   |
   |--- test.js    -------- 测试文件
```


# 执行测试

```
npm run test
```