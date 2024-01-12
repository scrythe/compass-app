import { For, type Component } from "solid-js";
import ProjectCard from "./ProjectCard";
import styles from "./Home.module.css";

const App: Component = () => {
  const projectCards = [
    { name: "Kompass", path: "/Kompass" },
    { name: "Spracheingabe", path: "/Spracheingabe" },
  ];
  return (
    <>
      <section class={styles.cardSection}>
        <For each={projectCards}>
          {(card) => <ProjectCard name={card.name} path={card.path} />}
        </For>
      </section>
    </>
  );
};

export default App;
