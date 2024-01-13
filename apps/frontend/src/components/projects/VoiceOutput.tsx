import { Component, For, Show, createSignal, onMount } from "solid-js";
import styles from "./VoiceOutput.module.css";
import volumeOn from "../../assets/volume-on.svg";
import volumeOff from "../../assets/volume-off.svg";

function preloadImgs(imgUrls: string[]) {
  imgUrls.forEach((url) => {
    const image = new Image();
    image.src = url;
  });
}

const VoiceOutput: Component = () => {
  onMount(() => preloadImgs([volumeOn]));
  const voiceTexts = ["Hello Friend", "Yeah boii", "Hehehehaw"];
  const [getSpeak, setSpeak] = createSignal(false);
  voiceTexts.push(...voiceTexts);
  voiceTexts.push(...voiceTexts);
  voiceTexts.push(...voiceTexts);
  voiceTexts.push(...voiceTexts);
  return (
    <main class={styles.main}>
      <section class={styles.voiceSection}>
        <div class={styles.outputHistory}>
          <For each={voiceTexts}>{(voiceText) => <div>{voiceText}</div>}</For>
        </div>
        <input class={styles.inputField} />
      </section>
      <Show
        when={getSpeak()}
        fallback={
          <button
            class={styles.speak}
            type="button"
            onClick={() => setSpeak(true)}
            title="Start"
          >
            <img src={volumeOff} alt="start speaking" />
          </button>
        }
      >
        <button
          class={styles.speak}
          type="button"
          onClick={() => setSpeak(false)}
          title="Start"
        >
          <img src={volumeOn} alt="stop speaking" />
        </button>
      </Show>
    </main>
  );
};

export default VoiceOutput;
