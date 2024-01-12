/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route, Routes } from "@solidjs/router";
import "./index.css";
import App from "./App";
import Home from "./components/Home.tsx";
import CompassComponent from "./components/projects/CompassComponent";
import VoiceInputComponent from "./components/projects/VoiceInputComponent";

const root = document.getElementById("root");

render(
  () => (
    <App>
      <Router>
        <Routes>
          <Route path="/*" component={Home} />
          <Route path="/Kompass" component={CompassComponent} />
          <Route path="/Spracheingabe" component={VoiceInputComponent} />
        </Routes>
      </Router>
    </App>
  ),
  root!,
);
