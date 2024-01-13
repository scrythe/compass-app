import { Component } from "solid-js";
import styles from "./VoiceOutput.module.css";

const VoiceOutput: Component = () => {
  return (
    <main class={styles.main}>
      <section class={styles.voiceSection}>
        <div class={styles.outputHistory}>
          <div>Hello Friend</div>
          <div>Hello Friend</div>
        </div>
        <input class={styles.inputField} />
      </section>
    </main>
  );
};

export default VoiceOutput;
