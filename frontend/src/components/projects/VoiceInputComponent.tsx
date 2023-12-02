import { type Component } from "solid-js";
import micIcon from "../../assets/microphone-342.svg";
import styles from "./VoiceInput.module.css";
import { io } from "socket.io-client";

const VoiceInputComponent: Component = () => {
  io(import.meta.env.VITE_SOCKET_HOST);
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
