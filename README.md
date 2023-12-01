# esbuild-demo

用于 esbuild 验证和学习

## 调研路径

- 基础
  1、是否支持 js、jsx、ts、tsx（在 js 中写 jsx）
  2、是否支持简单的 css、module css、less、module less（包括相互之间的引用）
  3、是否支持字体图标
  4、是否支持常规的图片资源（在 jsx/tsx/css/less/html 中的引用）
  5、是否支持其他不常见的图片格式处理
  6、其他资源文件处理：.json .txt .data 等
  7、配置路径别名缩短引用路径
- 进阶
  1、资源的进阶需求：当图片小于 8kb 时，转换为 base64 格式（也就是如何在 file 和 dataurl 中自由切换）
  2、排除部分第三方包，使用 cdn（排除 react、react-dom）
  3、代码压缩（html、js、css）
  4、css 加厂商后缀
  5、css 兼容 老浏览器
  6、js 兼容老浏览器 + 新 API 转换
  7、tree shaking
  8、基本的代码分割、分包、测试动态加载（import (xx).then(xxx)）
  9、提取第三方包成一个单独的包(做不到)
  10、文件加 hash
  11、source-map（没有 webpack 那么多的选项）
  12、每次打包前清空 dist 目录 ）
  13、按照打包后的文件类型进行分类
  14、如何获取环境变量：看看是 dev 还是 prod(define 属性)
- 可选
  1、构建前进行 ts 类型检测（可选）webpack 用这个 fork-ts-checker-webpack-plugin
  2、开发服务器
  3、api 请求代理

## 1、初始化项目

- yarn init
- yarn add react react-dom typescript
- npx tsx --init
- 修改部分配置 yarn add @types/react @types/react-dom
- 配置基础的 esbuild 配置文件，并尝试打包
- 在 dist 目录下手动生成一个 html 模版文件，并看 react 有没有成功生效
- 尝试将文件后缀改成 .jsx .js 后缀均能成功打包并生效
- 在 js 中写 jsx 并引用后重新打包，此时会报错：The esbuild loader for this file is currently set to "js" but it must be set to "jsx" to be able
  to parse JSX syntax. You can use "loader: { '.js': 'jsx' }" to do that。
  此时讲解一下 loader 的配置，配置完成后重新打包成功
- 在 main.css 中测试 css 样式
- 在 pageA.module.css 中测试 module.css，无需进行配置，如果想让 .module.css 解析成正常的 css 文件，可以使用 css loader 或者 global loader
- 想法：看这 module.css 的命名规则，这样不会冲突吗？测试下来并不会，因为它先拿 xx.module.css 中的 [xx] + 下划线，然后如果发现重复了就在之前的命名上 + 1，比如之前是 pageA_xxx.css，如果重复了就 page_xxx2.css，看来是多虑了，删掉此测试文件
- 新建 PageB 测试 less 文件，报错：No loader is configured for ".less"。
  解决方案：yarn add esbuild-plugin-less
