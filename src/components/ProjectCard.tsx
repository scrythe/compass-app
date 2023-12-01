import type { Component } from "solid-js";
import styles from "./ProjectCar.module.css";

const ProjectCard: Component<{ name: string }> = (props) => {
  return (
    <article class={styles.card}>
      <p>{props.name}</p>
    </article>
  );
};

export default ProjectCard;
