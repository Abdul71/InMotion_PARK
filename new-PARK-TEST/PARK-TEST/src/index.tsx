import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <RecoilRoot>
    <Router>
      <App />
    </Router>
  </RecoilRoot>,
  document.getElementById("root")
);
reportWebVitals(console.log);
