const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs");
const { lessLoader: lessLoaderPlugin } = require("esbuild-plugin-less");
const { htmlPlugin } = require("@craftamap/esbuild-plugin-html");
const inlineImagePlugin = require("esbuild-plugin-inline-image");
const { clean } = require("esbuild-plugin-clean");
const postcss = require("postcss");
const postcssPresetEnv = require("postcss-preset-env");
const cssVariables = require("postcss-css-variables");
const babel = require("@babel/core");

const entryPoints = ["main.tsx"];

const options = {
  // 入口文件
  entryPoints,
  // 启动打包
  bundle: true,
  // 输出目录文件夹
  outdir: "dist",
  // esbuild 默认会解析以下文件类型：.js .jsx .ts .tsx .json .css .txt .png .jpg .jpeg .gif .svg .ico
  loader: {
    ".js": "jsx", // 默认是 .js:js
    ".ts": "tsx", // 默认是 .ts:ts
    ".tsx": "tsx", // 默认就支持
    ".jsx": "jsx", // 默认就支持

    ".css": "css", // 默认就支持
    ".module.css": "local-css", // 默认就支持 "local-css" 专门用于支持 module css

    // file 这个 loader 会将文件复制到输出目录，并将文件名返回到源代码中
    // 这里用 dataurl loader，相当于将字体图标都转换为 Base 64 格式插入到了 App.css 文件中
    // 这里用file loader 的话，就相当于拷贝
    ".ttf": "dataurl", // 为了支持字体图标
    ".eot": "dataurl", // 为了支持字体图标
    ".woff": "dataurl", // 为了支持字体图标
    ".woff2": "dataurl", // 为了支持字体图标
    ".svg": "dataurl", // 为了支持字体图标

    ".jpg": "dataurl",

    ".txt": "text",
    ".json": "json", // 默认就是这个
  },
  // 配置别名，不仅可以配置路径，还可以配置包名
  alias: {
    // 这里还运行替换包名，当识别hello 这个包时自己用成 react 包，这个功能还是很有用的，比如替换为华为最近发布的包
    // hello: "react",
    "@": path.resolve(__dirname, "./src"),
    "@imgs": path.resolve(__dirname, "./src/imgs"),
    "@pages": path.resolve(__dirname, "./src/pages"),
  },
  // 此选项告诉 esbuild 以 JSON 格式生成一些有关构建的元数据。以下示例将元数据放入名为 的文件中meta.json
  // 想要用 htmlPlugin 插件，必须开启metafile
  metafile: true,
  // 配置true的话，默认就是 linked 模式，这里的模式选择：linked｜external｜inline｜both
  sourcemap: false,
  // 将这几个模块标记为外部依赖
  external: ["react", "react-dom", "lodash"],
  // 开启代码压缩
  minify: false,
  // 配置兼容的浏览器或js版本
  // target: ["es2015", "chrome58", "firefox57"],
  // 开启 tree-shaking
  treeShaking: true,
  // 开启代码分割，同时还要设置format
  splitting: true,
  format: "esm",
  // 对资源文件分类和加内容hash
  // 当用file loader 解析的文件都会放在这里
  assetNames: "assets/[name]-[hash]",
  // 对js、cs进行分类
  chunkNames: "[ext]/[name]-[hash]",
  // 对入口文件进行分类并加 hash
  entryNames: "[name]-[hash]",
  define: {
    "process.env.NODE_ENV": `"${process.env.NODE_ENV || false}"`, // 设置 NODE_ENV
  },
  plugins: [
    lessLoaderPlugin({
      // 主题配置
      globalVars: {
        primaryColor: "blue",
      },
    }),
    htmlPlugin({
      files: [
        {
          // entryPoints (string[]): 要注入到创建的HTML文件中的入口点（Entry Points）数组。例如，['src/index.jsx']。可以指定多个入口点。
          entryPoints,
          // 输出的HTML文件的文件名，例如 index.html。路径是相对于输出目录的。
          filename: "index.html",
          // title (string): 注入到<head>中的<title>标签的内容，如果未指定，则不设置。
          // 会覆盖模版中默认的title
          title: "学习",
          // htmlTemplate (string): 自定义HTML文档模板字符串。如果省略模板，则将使用默认模板。可以是HTML字符串，也可以是指向HTML文件的相对路径。
          htmlTemplate: "./public/index.html",
          // define (Record<string, string>): 定义可在 html 模板上下文中访问的自定义值。
          define: {
            name: "不要秃头啊",
          },
          // scriptLoading ('blocking' | 'defer' | 'module'): 决定是否将脚本标签插入为阻塞脚本标签，带有 defer=""（默认），或带有 type="module"。
          scriptLoading: "module",
          // findRelatedCssFiles (boolean): 查找相关的输出 *.css 文件并将它们注入到HTML中。默认为 true。
          findRelatedCssFiles: true,
          // 默认为false，开启后相当于将所有的css,js文件全部放在html文件中，这样相当于只需要用到html文件
          // 属性用于控制是否将脚本和样式资源嵌入到 HTML 文件中，而不是作为外部文件引用。这可以有助于减少页面的请求次数，从而提高页面加载性能，特别是对于较小的应用
          inline: false,
          // extraScripts ((string | { src: string; attrs?: { [key: string]: string } } )[]): 额外的脚本，可以是字符串数组或包含 src 和可选 attrs 的对象。用于在HTML中插入其他脚本。
          // 这个属性相当于可以做外链
          extraScripts: [
            {
              src: "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js",
            },
            {
              src: "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js",
            },
            {
              src: "https://mks-test.mypaas.com/lodash.min.js",
            },
          ],
          // hash (boolean | string): 为所有包含的脚本和CSS文件附加哈希以进行缓存破坏。哈希基于给定的字符串。如果给定一个布尔值，哈希基于当前时间。
          // 为引入的 js 和 css 添加hash，但是感觉不太好这里，因为使用的是时间戳
          hash: false,
        },
      ],
    }),
    // copy plugin
    {
      name: "copy-plugin", // 插件的名称
      setup(build) {
        // 辅助函数，用于检查给定字符串是否是文件路径
        function isPathToFile(str) {
          return !!path.extname(str);
        }

        // 辅助函数，用于同步复制文件
        function copyFileSync(source, target) {
          if (isPathToFile(target)) {
            const targetDir = path.dirname(target);

            if (!fs.existsSync(targetDir)) {
              fs.mkdirSync(targetDir, { recursive: true });
            }

            fs.copyFileSync(source, target);
          } else {
            if (!fs.existsSync(target)) {
              fs.mkdirSync(target, { recursive: true });
            }

            fs.copyFileSync(source, path.join(target, path.basename(source)));
          }
        }

        // 辅助函数，用于递归同步复制文件夹
        function copyFolderRecursiveSync(source, target, copyWithFolder) {
          if (copyWithFolder) {
            const folder = path.join(target, path.basename(source));

            if (!fs.existsSync(folder)) {
              fs.mkdirSync(folder, { recursive: true });
            }

            return copyFolderRecursiveSync(source, folder);
          }

          if (!fs.existsSync(target)) {
            fs.mkdirSync(target, { recursive: true });
          }

          if (fs.lstatSync(source).isDirectory()) {
            const files = fs.readdirSync(source);

            files.forEach((file) => {
              const curSource = path.join(source, file);

              if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, path.join(target, file));
              } else {
                copyFileSync(curSource, target);
              }
            });
          }
        }

        // 主要复制函数，可以处理单个文件、单个文件夹、多个文件、多个文件夹
        function copy({ source, target, copyWithFolder }) {
          if (Array.isArray(target)) {
            // 如果 target 是数组，逐个处理
            target.forEach((targetItem) => {
              copy({ source, target: targetItem, copyWithFolder });
            });
          } else if (Array.isArray(source) && !Array.isArray(target)) {
            // 如果 source 是数组而 target 不是数组，逐个处理
            source.forEach((sourceItem) => {
              copy({ source: sourceItem, target, copyWithFolder });
            });
          } else if (fs.existsSync(source)) {
            // 如果 source 存在
            if (fs.lstatSync(source).isFile()) {
              // 如果 source 是文件，直接复制文件
              copyFileSync(source, target);
            } else if (fs.lstatSync(source).isDirectory()) {
              // 如果 source 是文件夹，递归复制文件夹
              copyFolderRecursiveSync(source, target, copyWithFolder);
            }
          }
        }

        // 配置复制的选项，这里不支持 *，后面可以写个支持的插件
        const copyOptions = {
          source: ["./public/juejin.svg"], // 源文件或文件夹路径，可以是数组
          target: "./dist", // 目标文件夹路径
          copyWithFolder: false, // 是否把父文件夹复制过去，false 就是只复制该文件夹下的内容
        };

        // 在 esbuild 完成构建后触发的回调，执行复制操作
        build.onEnd(() => copy(copyOptions));
      },
    },
    inlineImagePlugin({
      limit: 3 * 1024, // 默认为10000，超过这个数用file loader，否则用dataurl loader
      // 这里如果 loader 中配置了 png 格式用 file loader，但是插件这里又配了，以这里的为准
      extensions: ["jpg", "jpeg", "png", "gif", "svg", "webp", "avif"], // 要处理的文件格式，默认为这些
    }),
    clean({ patterns: "dist/*" }),
    // 排除第三方包插件，配合 external 属性使用
    {
      name: "external-plugin",
      setup(build) {
        build.onResolve({ filter: /^lodash$/ }, (args) => {
          return { path: args.path, namespace: "lodash" };
        });
        build.onLoad({ filter: /.*/, namespace: "lodash" }, (args) => {
          return {
            contents: "module.exports=window._",
          };
        });

        build.onResolve({ filter: /^react$/ }, (args) => {
          return { path: args.path, namespace: "react" };
        });
        build.onLoad({ filter: /.*/, namespace: "react" }, (args) => {
          return {
            contents: "module.exports=window.React",
          };
        });

        build.onResolve({ filter: /^react-dom/ }, (args) => {
          return { path: args.path, namespace: "react-dom" };
        });
        build.onLoad({ filter: /.*/, namespace: "react-dom" }, (args) => {
          return {
            contents: "module.exports=window.ReactDOM",
          };
        });
      },
    },
    // 配置css兼容性问题
    {
      name: "postcss-plugin",
      async setup(build) {
        build.onLoad({ filter: /.css$/ }, async (args) => {
          const css = await fs.promises.readFile(args.path, "utf8");

          const result = await postcss([
            postcssPresetEnv,
            cssVariables,
          ]).process(css, {
            from: args.path,
          });

          return { contents: result.css, loader: "css" };
        });
      },
    },
    // 配置babel插件
    {
      name: "esbuild-plugin-babel",
      setup(build) {
        const options = {
          filter: /.ts?x$/,
          namespace: "",
        };

        const transformContents = ({ args, contents }) => {
          const babelOptions = babel.loadOptions({
            // // targets: "> 0.25%, not dead",
            // targets: {
            //   chrome: "58",
            //   ie: "11",
            // },
            filename: args.path,
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: 3, //需要指定安装core-js的版本，我这里安装的是 "core-js": "^3.23.4"
                },
              ],
              "@babel/preset-react", //预设是从前往后执行
              "@babel/preset-typescript",
            ],
            // "plugins": ["@babel/plugin-transform-block-scoping"],
            caller: {
              name: "esbuild-plugin-babel",
              supportsStaticESM: true,
            },
          });

          return new Promise((resolve, reject) => {
            babel.transform(contents, babelOptions, (error, result) => {
              error ? reject(error) : resolve({ contents: result.code });
            });
          });
        };

        build.onLoad(
          { filter: options.filter, namespace: options.namespace },
          async (args) => {
            const contents = await fs.promises.readFile(args.path, "utf8");

            return transformContents({ args, contents });
          }
        );
      },
    },
  ],
};

esbuild.build(options).catch((e) => console.log(e));
