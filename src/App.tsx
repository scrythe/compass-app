import { For, type Component } from "solid-js";
import ProjectCard from "./components/ProjectCard";
import styles from "./App.module.css";

const App: Component = () => {
  const projectCards = ["Kompass", "Wasserwaage"];
  return (
    <section class={styles.cardSection}>
      <For each={projectCards}>{(card) => <ProjectCard name={card} />}</For>
    </section>
  );
};

export default App;
