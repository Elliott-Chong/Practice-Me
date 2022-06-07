import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Switch, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import "./css/custom.css";
import React from "react";
import PracticePage from "./pages/PracticePage";
import { useGlobalContext } from "./context";

function App() {
  const { dispatch } = useGlobalContext();
  React.useEffect(() => {
    const navHeight = document
      .querySelector("nav")
      .getBoundingClientRect().height;
    document.getElementById("main-container").style.paddingTop =
      navHeight + "px";
    dispatch({ type: "SET_NAV_HEIGHT", payload: navHeight });
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <main id="main-container" className="bg-gray-800">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/practice" exact component={PracticePage} />
          {/* <Route path="/compete" exact component={PracticePage} /> */}
        </Switch>
      </main>
    </>
  );
}

export default App;
