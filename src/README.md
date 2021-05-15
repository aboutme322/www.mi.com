### 项目说明

前端(PC)端项目结构
- 项目名
    - [node_modules]  存放第三方node模块 由npm自动生成 
    - [interface]     用于存放php文件
        -[library]    库文件 例如 conn
    - [src]           存放前端项目源码(开发环境)
        - [html]
            - index.html
            - product.html
            - shop.html
            ....
        - [styles]
            - index.less
        - [js]
            - [library]  前端的库文件(模块)
                - jquery.js
                - bootstarp.js
                - cookie.js
                - querystring.js
            - index.js
            - product.js
            - shop.js
            - reg.js
            - login.js
    - [dist]     用于存放工具生成的文件(部署环境的文件) gulp grunt webpack...
        - [html]
            - index.html
        - [css]
            - index.min.css
        - [js]
            - [library]
                - jquery.min.js
                - bootstrap.min.js
                - cookie.min.js
            - index.min.js
            - product.min.js
    - gulpfile.js     gulp的配置文件
    - .gitignore      git忽略列表
    - package.json    nodejs模块依赖列表
    - README.md


---------------------------------
目录结构和文件创建完成后
1. 填写git忽略列表
2. 项目初始化(需要在项目根目录执行)   `$ npm init -y`
3. 初始化代码管理工具 `$ git init`

---------------------------------
### 项目构建工具 gulp
Gulp.js 是基于 Node.js 构建的,利用 Node.js 流的威力,你可以快速构建项目并减少频繁的 IO 操作。

项目代码分为三类
1. 源代码(用于开发环境)
2. 第三方代码 (jquery bootstarp)
3. 部署代码(用于部署环境 由工具生成)

### npm 工具安装
使用国内npm镜像 由阿里云提供

1. 使用nrm 切换源
```bash
$ npm install nrm -g     # 全局安装nrm
$ nrm use taobao         # 切换到阿里云镜像
$ nrm ls                 # 查看所有源
```

2. 使用cnpm 代替npm (推荐)
```bash
$ npm install cnpm -g --registry=https://registry.npm.taobao.org/
```

### npm安装命令
npm install(i) packageName -g                  # 全局安装(一般是工具或命令行工具)
npm install(i) packageName --save(-S)          # 项目依赖安装(安装项目在部署环境使用的东西)
npm install(i) packageName --save-dev(-D)      # 开发依赖安装(安装项目在开发华宁使用的工具)

使用npm命令进行安装时 注意点
1. 所有的项目依赖安装和开发依赖安装 需要在项目根目录执行
2. 全局安装 在哪都可以执行
3. npm 可以使用 cnpm 代替
$ cnpm install jquery --save

4. osx操作系统在进行全局时 在安装命令前加 sudo
$ sudo npm install nrm -g



gulp安装
```bash
# 所有全局安装的内容 每台电脑只需要执行一次
$ cnpm i gulp -g     # 全局安装gulp
$ cnpm i gulp-cli -g # 全局安装gulp命令行工具

$ cnpm i gulp -D     # 开发依赖安装(项目根目录执行)
```