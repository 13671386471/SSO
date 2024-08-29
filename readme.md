来源：小野WEB世界 
https://www.bilibili.com/video/BV114421U7e8?p=3&vd_source=3b593c22f45e0e55b925c98ccc703847


### 什么是sso
SSO（Single Sign-On）即单点登录，是一种通过一个身份验证来管理多个网站之间登录的机制。

### 什么是单点登陆
    1、之前的系统部署情况是单体系统部署，用户登录后，直接访问系统，系统内部会自动验证用户身份，然后跳转到用户请求的页面。
    2、现在情况是之前的大系统都拆分为多个小系统（子系统）
        2.1 子系统部署都是分布式的部署在独立的服务器上
    3、用户管理需要怎么做？
        3.1 我们需要一个统一的认证中心
            3.1.1 登陆注册生成Token
            3.1.2 验证Token
            3.1.3 通过refreshToken对API请求的Token进行刷新
        3.2 接口只要需要用户权限认证的情况，全部都向认证中心进行请求认证(通过添加认证中间键)
        3.3 接口的服务不直接请求认证中心，而是客户端进行登陆注册或者是遇到TOKEN失效时，客户端主动请求认证中心进行刷新TOKEN

yarn create vite client --template vue

命令 yarn create vite client --template vue 用于使用 Vite 脚手架创建一个新的 Vue.js 项目。

yarn create vite: 是用于初始化一个新 Vite 项目的命令。
client: 是你为这个新项目指定的名字，这里的 client 会成为项目文件夹的名称。
--template vue: 指定使用 Vue.js 的模板来初始化项目。这意味着创建的项目将包含 Vue.js 的相关配置和依赖包。
执行这个命令后，会在当前目录下创建一个名为 client 的文件夹，并在其中设置好一个基本的 Vue.js + Vite 的开发环境。你可以直接运行 cd client 进入项目目录，然后运行 yarn dev 或者 yarn start 来启动开发服务器。


server: 服务端
    - api服务模块
    - auth 认证服务模块
一：
    1、进入auth模块进行初始化 npm init -y 创建package.json文件
    2、安装依赖包 npm install express mongoose jsonwebtoken bcryptjs 
    3、配置package.json 中的script, "dev": "nodemon app.js"