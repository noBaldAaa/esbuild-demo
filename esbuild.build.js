const esbuild = require("esbuild");

const options = {
  // 入口文件
  entryPoints: ["main.tsx"],
  // 启动打包
  bundle: true,
  // 输出目录文件夹
  outdir: "dist",
};

esbuild.build(options).catch((e) => console.log(e));
