import React from "react";
import styles from "../styles/Home.module.css";

const FloatButton = () => {
  return (
    <div className={styles.btnWrapper}>
      <button
        data-uk-toggle="target: #add-modal"
        className={`${styles.addButton} uk-icon-button`}
        uk-icon="plus"
      ></button>
    </div>
  );
};

export default FloatButton;
