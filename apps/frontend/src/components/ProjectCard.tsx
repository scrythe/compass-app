import type { Component } from "solid-js";
import styles from "./ProjectCar.module.css";
import { A } from "@solidjs/router";

const ProjectCard: Component<{ name: string; path: string }> = ({
  name,
  path,
}) => {
  return (
    <article class={styles.card}>
      <A href={path}>{name}</A>
    </article>
  );
};

export default ProjectCard;
