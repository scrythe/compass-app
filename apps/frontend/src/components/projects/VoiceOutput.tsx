import { Component, For, Show, createSignal } from "solid-js";
import styles from "./VoiceOutput.module.css";
import VolumeOn from "../../assets/volume-on";
import VolumeOff from "../../assets/volume-off";

const VoiceOutput: Component = () => {
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
            <VolumeOff />
          </button>
        }
      >
        <button
          class={styles.speak}
          type="button"
          onClick={() => setSpeak(false)}
          title="Start"
        >
          <VolumeOn />
        </button>
      </Show>
    </main>
  );
};

export default VoiceOutput;
