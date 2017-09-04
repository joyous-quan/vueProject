# vuejs

> A Vue.js project

一个集合前后端的后台管理系统(nodejs)

client =>前端

server =>后台

1.两个文件分别安装依赖
npm install

2.启动数据管理 mongod
一般在C盘找到 C:\Program Files\MongoDB\Server\3.4\bin
点击mongod.exe
启动好放着就可以了

3.启动后台
进入server文件中 打开cmd命令
node ./bin/www(一般用supervisor ./bin/www 代替（需安装）)

一般默认localhost:3000 （有看到express表成功）

4. 前端
进入client文件中 打开cmd命令
npm run dev
一般默认localhost:8080 （页面显示表成功）


附：如果退出登录 不能再登录，可重新开localhost:8080 进入用户页面添加用户信息再以此信息登录