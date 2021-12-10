import type { NextPage } from "next";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import ModalPortal from "../components/ModalPortal";

const Todos = dynamic(() => import("../components/Todos"), { ssr: false });
const FloatButton = dynamic(() => import("../components/FloatButton"), {
  ssr: false,
});
const AddModal = dynamic(() => import("../components/AddModal"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className={styles.content}>
      <Todos />
      <ModalPortal>
        <AddModal />
      </ModalPortal>
      <FloatButton />
    </div>
  );
};

export default Home;
