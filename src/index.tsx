/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route, Routes } from "@solidjs/router";
import "./index.css";
// import App from "./App";
import CompassComponent from "./components/projects/CompassComponent";

const root = document.getElementById("root");

render(
  () => (
    <Router>
      <Routes>
        <Route path="/*" component={CompassComponent} />
      </Routes>
    </Router>
  ),
  root!,
);
