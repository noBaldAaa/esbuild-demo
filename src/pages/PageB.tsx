import React, { useEffect } from "react";
import ESBUILD_LOGO from "../imgs/esbuild.svg";

import "./pageB.less";

const PageB = () => {
  useEffect(() => {
    const dom: any = document.getElementById("img");
    dom.src = ESBUILD_LOGO;
  }, []);

  return (
    <div>
      <h3 className={"pageB-test-less-background"}>
        我是PageB页面 测试.less文件
      </h3>
      <div>测试在tsx中通过import的方式导入图片：</div>
      <img
        src={ESBUILD_LOGO}
        style={{ width: "100px", height: "100px", backgroundSize: "contain" }}
      />
      <div>测试在tsx中通过dom的方式插入图片：</div>
      <img
        id="img"
        style={{ width: "100px", height: "100px", backgroundSize: "contain" }}
      ></img>
    </div>
  );
};

export default PageB;
