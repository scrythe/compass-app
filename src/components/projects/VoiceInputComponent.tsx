import { type Component } from "solid-js";
import micIcon from "../../assets/microphone-342.svg";
import styles from "./VoiceInput.module.css";

const VoiceInputComponent: Component = () => {
  return (
    <main class={styles.main}>
      <div class={styles.voiceText}></div>
      <button class={styles.micBtn} type="button" title="Start">
        <img src={micIcon} alt="" />
      </button>
    </main>
  );
};

export default VoiceInputComponent;
