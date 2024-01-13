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
  let inputField: HTMLInputElement;
  const [getSpeak, setSpeak] = createSignal(false);
  const [getVoiceTexts, setVoiceTexts] = createSignal<string[]>([]);

  const saveMessage = (event: Event) => {
    event.preventDefault();
    setVoiceTexts([inputField.value, ...getVoiceTexts()]);
  };
  return (
    <main class={styles.main}>
      <section class={styles.voiceSection}>
        <div class={styles.outputHistory}>
          <For each={getVoiceTexts()}>
            {(voiceText) => <div>{voiceText}</div>}
          </For>
        </div>
        <form class={styles.inputForm} onSubmit={saveMessage}>
          <input ref={inputField!} class={styles.inputField} />
        </form>
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
