import { Show, type Component, createSignal, onMount } from "solid-js";
import micIcon from "../../assets/mic.svg";
import muteMicIcon from "../../assets/mute-mic.svg";
import styles from "./VoiceInput.module.css";
import VoiceInput from "../../services/voiceInput";
// import { io } from "socket.io-client";

function preloadImgs(imgUrls: string[]) {
  const image = new Image();
  imgUrls.forEach((url) => (image.src = url));
}

const VoiceInputComponent: Component = () => {
  const [isTalking, setTalking] = createSignal(false);
  const voiceInput = new VoiceInput(setTalking);
  onMount(() => preloadImgs([micIcon, muteMicIcon]));
  // io(import.meta.env.VITE_SOCKET_HOST);
  return (
    <main class={styles.main}>
      <div class={styles.voiceText}></div>
      <Show when={isTalking()}>
        <button
          class={styles.micBtn}
          onClick={() => voiceInput.stopMicrophone()}
          type="button"
          title="Stop"
        >
          <img src={micIcon} alt="microphone" />
        </button>
      </Show>
      <Show when={!isTalking()}>
        <button
          class={styles.micBtn}
          onClick={() => voiceInput.startMicrophone()}
          type="button"
          title="Start"
        >
          <img src={muteMicIcon} alt="mute microphone" />
        </button>
      </Show>
    </main>
  );
};

export default VoiceInputComponent;
