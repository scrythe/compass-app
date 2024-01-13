/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route, Routes } from "@solidjs/router";
import "./index.css";
import App from "./App";
import Home from "./components/Home";
import Compass from "./components/projects/Compass";
import VoiceInput from "./components/projects/VoiceInput";
import VoiceOutput from "./components/projects/VoiceOutput";

const root = document.getElementById("root");

render(
  () => (
    <App>
      <Router>
        <Routes>
          <Route path="/*" component={Home} />
          <Route path="/Kompass" component={Compass} />
          <Route path="/Spracheingabe" component={VoiceInput} />
          <Route path="/Sprachausgabe" component={VoiceOutput} />
        </Routes>
      </Router>
    </App>
  ),
  root!,
);
