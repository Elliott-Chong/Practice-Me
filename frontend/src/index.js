import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AppContext from "./context";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

axios.defaults.baseURL = "http://192.168.50.74:5000";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <AppContext>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </AppContext>
    </QueryClientProvider>
  </Router>
);
