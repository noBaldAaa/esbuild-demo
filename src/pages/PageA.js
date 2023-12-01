import React from "react";

import styles from "./pageA.module.css";

const PageA = () => {
  return (
    <div>
      <h3 className={styles["pageA-test-module-css-color"]}>
        我是PageA页面 测试.module.css文件
      </h3>
    </div>
  );
};

export default PageA;
