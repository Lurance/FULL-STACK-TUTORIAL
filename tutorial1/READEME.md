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
```