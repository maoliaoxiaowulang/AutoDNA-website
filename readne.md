# AutoDNA Website 本地运行说明

## 环境要求

- Node.js 18 或更高版本
- npm

## 安装依赖

在项目根目录执行：

```bash
npm install
```

## 启动本地开发服务器

```bash
npm run dev
```

命令启动后，终端会显示本地访问地址，通常是：

```text
http://localhost:5173/
```

在浏览器中打开该地址即可查看网站。开发服务器支持热更新，修改源码后页面会自动刷新。

## 构建生产版本

```bash
npm run build
```

构建产物会输出到 `dist` 目录。

## 本地预览生产构建

先执行构建：

```bash
npm run build
```

再启动预览服务器：

```bash
npm run preview
```

终端会显示预览地址，通常是：

```text
http://localhost:4173/
```
