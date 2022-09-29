import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AppContext from "./context";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "http://192.168.50.74:5000";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AppContext>
      <App />
    </AppContext>
  </Router>
);
