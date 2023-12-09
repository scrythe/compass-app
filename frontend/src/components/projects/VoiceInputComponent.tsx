import { Show, type Component, createSignal, onMount } from "solid-js";
import micIcon from "../../assets/mic.svg";
import muteMicIcon from "../../assets/mute-mic.svg";
import styles from "./VoiceInput.module.css";
import VoiceInput from "../../services/voiceInput";

function preloadImgs(imgUrls: string[]) {
  imgUrls.forEach((url) => {
    const image = new Image();
    image.src = url;
  });
}

const VoiceInputComponent: Component = () => {
  onMount(() => preloadImgs([micIcon]));

  const [isTalking, setTalking] = createSignal(false);
  const [outputText, setOutputText] = createSignal("");
  setOutputText("");

  const voiceInput = new VoiceInput(setTalking, setOutputText);
  voiceInput.handleData();

  return (
    <main class={styles.main}>
      <div class={styles.voiceText}>{outputText()}</div>
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
