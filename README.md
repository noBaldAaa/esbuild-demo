# esbuild-demo

用于 esbuild 验证和学习

## 调研路径

- 基础
  1、是否支持 js、jsx、ts、tsx（在 js 中写 jsx）✅
  2、是否支持简单的 css、module css、less、module less ✅（包括相互之间的引用）
  3、是否支持字体图标 ✅
  4、是否支持常规的图片资源（在 jsx/tsx/css/less/html 中的引用） ✅
  5、是否支持其他不常见的图片格式处理 ✅
  6、其他资源文件处理：.json .txt .data 等 ✅
  7、配置路径别名缩短引用路径
  8、html 模版 ✅
- 进阶
  1、资源的进阶需求：当图片小于 8kb 时，转换为 base64 格式（也就是如何在 file 和 dataurl 中自由切换）✅
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

## 实战调研

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
- 测试 css、module.css、less、module.less 之间的相互引用 均通过
- 引入字体图标，打包报错：No loader is configured for ".woff2 .ttf .woff .svg .eot"，配置 dataurl loader
- 测试图片资源，在 module.css 中成功，依次在其他 css/less 文件中成功
- 测试图片资源，在 js 中引入图片成功
- 为了测试 html 中引入图片，我们先创建 html 模版，再者我们现在是手动在 dist 中创建 html 文件的，依赖文件也是我们手动添加的，这样肯定不行
- 为了生效，这时候用 @craftamap/esbuild-plugin-html 插件,这个插件很强大，解读一下，这里有个坑，想要用这个插件，必须开启 metafile：true
- 为了能看到 html 中的图片，我们还需要将 public 中的图片复制到 dist 目录下，这里再用一个插件，看了一圈都不太行，还是自己动手写一个吧.....，下一篇重点讲插件机制和如何写插件。
- 在 css、js、html 中引入图片成功
- 支持其他不常见的图片格式处理：可以使用 file loader 或 dataurl 进行处理
- 对 data、txt、json 文件进行解析
- loader 总结：在 esbuild 中，loader 用于处理不同类型的文件，并将它们转换为 JavaScript 模块或其他适当的输出。以下是一些常见的 loader 类型及其作用：
  1、js (JavaScript Loader): 处理 JavaScript 文件。
  例子： import 或 require JavaScript 文件时，该 loader 将处理这些文件。
  2、jsx (JSX Loader):处理包含 JSX 语法的 JavaScript 文件。
  例子： 用于处理 React 组件中的 JSX 语法。
  3、ts (TypeScript Loader):处理 TypeScript 文件。
  例子： 用于处理 TypeScript 代码文件。
  4、tsx (TSX Loader): 处理包含 JSX 语法的 TypeScript 文件。
  例子： 用于处理包含 JSX 语法的 TypeScript 代码文件。
  5、css (CSS Loader): 处理 CSS 文件。
  例子： import CSS 文件时，该 loader 处理这些文件。
  6、local (Local Loader): 处理局部 CSS 文件，支持 CSS 模块化。
  例子： import styles from './styles.module.css';
  7、global (Global Loader):处理全局 CSS 文件，不启用 CSS 模块化。
  例子： import './styles.css';
  8、json (JSON Loader):处理 JSON 文件。
  例子： import JSON 文件时，该 loader 处理这些文件。
  9、file (File Loader):处理二进制文件，例如图像、字体等。该加载程序会将文件复制到输出目录，并将文件名作为字符串嵌入到包中。和 webpack 的 file-loader 一样
  例子： import 图像或字体文件时，该 loader 处理这些文件。
  10、text (Text Loader): 处理文本文件。
  例子： import 文本文件时，该 loader 处理这些文件。
  11、base64 (Base64 Loader):将文件转换为 Base64 编码。
  例子： 可用于将小型图像文件直接嵌入 JavaScript 代码中。
  12、dataurl (Data URL Loader): 将文件转换为 Data URL 格式。
  例子： 类似于 Base64 Loader，将文件直接嵌入到代码中，但以 Data URL 形式。
  13、binary (Binary Loader):处理二进制文件。
  例子： 用于处理不需要转换的二进制文件。
  14、text (Text Loader):处理文本文件。
  例子： import 文本文件时，该 loader 处理这些文件。
  15、copy (Copy Loader): 复制文件到输出目录而不进行处理。
  例子： 用于将特定文件原封不动地复制到输出目录。
  16、empty (Empty Loader): 生成一个空的模块。
  例子： 用于占位，或在某些情况下需要一个空模块时使用。
- 演示一下 file-loader 和 dataurl loader，这两个比较常用
- 当图片小于 xkb 时，转换为 base64 格式，怎么做？yarn add esbuild-plugin-inline-image
- 每次删 dist 目录太麻烦，使用 esbuild-plugin-clean 插件
- 配置别名，天坑来了！！！也就是 当我们 使用 @ / xx 的时候，自动替换到 src/ xx 目录下，当我们使用 @imgs 的时候自动替换到 src/imas 目录下。这生活大多数人肯定都去找 alias 这个 api 了，为啥这个项目可以！！！
