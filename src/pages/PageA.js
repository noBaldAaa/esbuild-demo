import React from "react";

import styles from "./pageA.module.css";

const PageA = () => {
  return (
    <div>
      <h3 className={styles["pageA-test-module-background"]}>
        我是PageA页面 测试.module.css文件
      </h3>
      <div> 测试通过background-image引入图片:</div>
      <div className={styles["pageA-background-image"]}></div>
    </div>
  );
};

export default PageA;
