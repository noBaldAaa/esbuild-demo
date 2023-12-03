# esbuild-demo

用于 esbuild 验证和学习

## 调研路径

- 基础
  是否支持 js、jsx、ts、tsx（在 js 中写 jsx）✅
  是否支持简单的 css、module css、less、module less ✅（包括相互之间的引用）
  是否支持字体图标 ✅
  是否支持常规的图片资源（在 jsx/tsx/css/less/html 中的引用） ✅
  是否支持其他不常见的图片格式处理 ✅
  其他资源文件处理：.json .txt .data 等 ✅
  配置路径别名缩短引用路径 ✅
  html 模版 ✅
- 进阶
  资源的进阶需求：当图片小于 8kb 时，转换为 base64 格式（也就是如何在 file 和 dataurl 中自由切换）✅
  source-map（没有 webpack 那么多的选项）✅
  排除部分第三方包，使用 cdn（排除 react、react-dom）✅
  代码压缩（html、js、css）✅
  css 加厂商后缀
  css 兼容 老浏览器
  js 兼容老浏览器 + 新 API 转换
  tree shaking
  基本的代码分割、分包、测试动态加载（import (xx).then(xxx)）
  提取第三方包成一个单独的包(做不到)
  文件加 hash
  每次打包前清空 dist 目录 ）
  按照打包后的文件类型进行分类
  如何获取环境变量：看看是 dev 还是 prod(define 属性)
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
- alias 不仅支持替换路径，还支持替换包名，比如我们引入 react 的时候，这样引入，然后再 alias 中进行配：xx，这代表当匹配到 hello 这个包的时候，用 react 去加载。这个还是很有用的，比如最近华为新出了一个 react 升级版的包，如果想要一键项目替换的话就可以用到这个属性。
- 另外，再多说一句，如果你用这个功能的时候发现了报错，可以尝试用一下社区的插件。这个功能个人认为问题还是挺多的，issue 也提了很多跟这个功能相关的 bug，笔者刚开始测试这个功能的时候踩了不少坑，社区也基于这个功能开发了好几个类似的插件。总之，你要是用这个功能不行的话，就尝试一下这个插件：xx
- 测试 source-map，source-map 总共有四种模式：
  linked： 生成单独的 .js.map 文件，并在 .js 文件中包含 //# sourceMappingURL= 注释。（优点：可以将源映射文件独立出来，减小生成的 .js 文件大小。）
  external： 生成单独的 .js.map 文件，但 .js 文件不包含 //# sourceMappingURL= 注释。（源映射文件独立存储，但 .js 文件不包含显式的注释。）
  inline： 将源映射以 base64 形式追加到 .js 文件的末尾，不生成额外的 .js.map 文件。
  （无需额外的 .js.map 文件，方便部署，一次加载即可获取源映射信息。，缺点：由于源映射通常较大，可能会增加 .js 文件的大小。）
  both： 同时生成 inline 和 external，即在 .js 文件末尾追加 inline，并生成单独的 .js.map 文件。（结合了 inline 和 external 的优势，可在 .js 文件中快速获取源映射信息，并且也有独立的 .js.map 文件备份。很难说这是优点还是缺点，暂时没想到应用场景）
  生产环境使用 external 模式 或 不生成 source-map 文件。开发环境使用 inline 模式 或 linked 模式。在生产环境中使用 external 模式生成独立的 source map 文件的目的主要是为了方便开发者在需要时进行错误追踪和调试。虽然浏览器不会自动加载并关联 source map 文件，但在开发人员需要查看详细的错误信息、追溯代码来源时，这个独立的 source map 文件就变得非常有价值。

  下面是一些 external 模式生成 source map 文件的用途：

  错误追踪： 当在生产环境中发生错误时，错误信息可能会包含堆栈跟踪（stack trace），而这个堆栈跟踪通常是对应于生成的压缩和混淆后的代码。通过使用独立的 source map 文件，开发者可以将堆栈跟踪还原为原始的、易于理解的源代码形式，从而更容易定位和修复问题。

  调试工具： 开发者可以在本地使用 source map 文件来配置浏览器的调试工具，以便在开发环境中进行更方便的调试。虽然浏览器可能不会自动加载 source map，但通过手动加载 source map，开发者可以在调试器中查看源代码，逐行调试。

  版本追溯： 独立的 source map 文件通常会包含版本信息和原始源代码的相对路径等信息。这些信息可以帮助开发者追溯到特定版本的源代码，从而更好地理解和解决生产环境中的问题。

  虽然 source map 文件对于生产环境来说可能增加了一些额外的开销（例如文件大小），但它们为开发者提供了在生产环境中进行追踪和调试的能力，有助于更快地响应和解决问题。在部署生产代码时，通常会确保 source map 文件不会被公开访问，以避免潜在的安全风险。

- 为了提升页面加载速度，加快打包速度，有时候我们需要将一些常用的第三方包或者依赖通过 cdn 引入，这样即能长久的使用缓存，节省带宽成本，又能提高加载速度，减小构建体积。

这个时候需要用到 external 属性，比如将我们常用的 React、React-DOM、lodash 这三个包标记为外部依赖，不参与打包过程。

但这个属性有个比较坑的地方是：它虽然会不打包 external 中配置的包名，但会保留它的导入语句。这是它的官网原话：

You can mark a file or a package as external to exclude it from your build. Instead of being bundled, the import will be preserved (using require for the iife and cjs formats and using import for the esm format) and will be evaluated at run time instead.

也就是说，虽然能排除第三方包，但是导入语句依然会被保留。

举个例子：当我们项目中导入了 react，并将其标记为了外部依赖，在打包的时候：会将 import react from "react"，变成 const react from “react”。当在浏览器运行时，由于找到 react 模版，会导致报错：xxx

https://github.com/evanw/esbuild/issues/3509

基于这个问题，我也是很不理解，并向 esbuild 的作者提出了我的疑问：xx 作者名称虽然并未解释为什么这么做，但是给出了解决方案，也就是在 web 环境中手动实现 require 函数，并判断当加载 react 模块的时候返回 cdn 中返回的 react 变量。

......

我个人对这种解决方案很难苟同，给出了我自己的解决方案，也就是写一个 esbuild 插件解决这种问题：

xxx

- 接下来测试代码压缩，这可以 esbuild 的重头戏，并且是核心优势。
  开启压缩： minify: true,使用方式很简单，速度也奇快，好用，点赞！
