/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route, Routes } from "@solidjs/router";
import "./index.css";
import App from "./App";
import Test from "./components/Test";

const root = document.getElementById("root");

render(
  () => (
    <Router>
      <Routes>
        <Route path="/*" component={App} />
        <Route path="/user" component={Test} />
      </Routes>
    </Router>
  ),
  root!,
);
