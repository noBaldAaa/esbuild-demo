import React from "react";

import styles from "./pageC.module.less";

const PageC = () => {
  const hello = async () => {
    await Promise.resolve("123");
  };
  return (
    <div>
      <h3 className={styles["pageC-test-module-less-background"]}>
        我是PageC页面 测试.module.less文件
      </h3>
      <button onClick={() => import("./PageA").then(console.log)}>
        测试 通过import 动态带入
      </button>
    </div>
  );
};

export default PageC;
