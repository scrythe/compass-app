import { type Component } from "solid-js";
import micIcon from "../../assets/microphone-342.svg";
import styles from "./VoiceInput.module.css";
import VoiceInput from "../../services/voiceInput";
// import { io } from "socket.io-client";

// async function getMicrophone() {
//   const userMedia = await navigator.mediaDevices.getUserMedia({
//     audio: true,
//   });
//   return new MediaRecorder(userMedia);
// }

// function sendRecording(_microphone: MediaRecorder) {}
//
// async function micBtnPress() {
//   sendRecording(microphone);
// }

const VoiceInputComponent: Component = () => {
  const voiceInput = new VoiceInput();
  // const [getMicrophone, setMicrophone] = createSignal<MediaRecorder>();
  // io(import.meta.env.VITE_SOCKET_HOST);

  return (
    <main class={styles.main}>
      <div class={styles.voiceText}></div>
      <button
        class={styles.micBtn}
        onClick={() => voiceInput.startMicrophone()}
        type="button"
        title="Start"
      >
        <img src={micIcon} alt="microphone" />
      </button>
    </main>
  );
};

export default VoiceInputComponent;
