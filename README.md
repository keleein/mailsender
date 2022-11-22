## 概述

mailsendr基于Vue Cli\electron\node.js\element ui创建。代码能够实现简单的邮件发送（smtp发送/邮件api发送）和简单的短信发送（短信宝api接口发送），页面布局采用element ui组件，数据从本地数据库获取。功能已实现，但应用场景不大，可作为一款小工具。属于自己初学的第一次成果，现上传到git，记录一下自己的心路旅程。可供他人免费学习研究。

## 环境配置

```
//项目中安装electron
npm install electron -S
//安装vue环境
npm install vue
//下载配置nodejs
https://nodejs.org/en/
//安装element ui
npm install element-ui -S
```

## 运行

```
//将页面渲染到本机终端（务必优先执行，否则electron没有页面显示）
npm run serve
//运行package.json中start脚本
```

页面图示：

![1669106423298](C:\Users\邱钢\AppData\Roaming\Typora\typora-user-images\1669106423298.png)

![1669106437980](C:\Users\邱钢\AppData\Roaming\Typora\typora-user-images\1669106437980.png)