import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./css/reset.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
// import dotenv from "dotenv";
// dotenv.config();

// console.log(process.env.REACT_APP_OPENAI_API_KEY);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RecoilRoot>
);

reportWebVitals();
