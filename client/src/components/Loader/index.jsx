import React from "react";
import Styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={`${Styles.lds_dual_ring}`}></div>
  )
};

export default Loader;
