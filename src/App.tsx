import type { Component } from "solid-js";
import needleImg from "./assets/needle.png";
import styles from "./App.module.css";

const App: Component = () => {
  return (
    <div class={styles.compassBody}>
      <img src={needleImg} class={styles.needle} />
    </div>
  );
};

export default App;
