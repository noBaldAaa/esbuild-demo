const esbuild = require("esbuild");

const options = {
  // 入口文件
  entryPoints: ["main.tsx"],
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
    ".module.css": "local-css", // "local-css" 专门用于支持 module css

    // file 这个 loader 会将文件复制到输出目录，并将文件名返回到源代码中
    // 这里用 dataurl loader，相当于将字体图标都转换为 Base 64 格式插入到了 App.css 文件中
    // 这里用file loader 的话，就相当于拷贝
    ".ttf": "file", // 为了支持字体图标
    ".eot": "file", // 为了支持字体图标
    ".woff": "file", // 为了支持字体图标
    ".woff2": "file", // 为了支持字体图标
    ".svg": "file", // 为了支持字体图标
    ".png": "file",

    // 默认就是这个
    ".txt": "text",
    ".json": "json", // 默认就支持
  },
};

esbuild.build(options).catch((e) => console.log(e));
