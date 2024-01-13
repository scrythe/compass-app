/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route, Routes } from "@solidjs/router";
import "./index.css";
import App from "./App";
import Home from "./components/Home";
import CompassComponent from "./components/projects/Compass";
import VoiceInputComponent from "./components/projects/VoiceInput";

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
