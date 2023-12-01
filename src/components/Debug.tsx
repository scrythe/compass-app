import { Component, Show } from "solid-js";
import styles from "./Debug.module.css";
import Game from "../game/game";

const Debug: Component<{ game?: Game }> = (props) => {
  const debug = true;

  return (
    <Show when={debug}>
      <div id={styles.debug}>
        <p>Delta Vector: {props.game?.gammaPosVec}</p>
      </div>
    </Show>
  );
};

export default Debug;
