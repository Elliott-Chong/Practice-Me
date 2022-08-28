import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Switch, Route, Redirect } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import QuestionsContext from "./questionsContext";
import "./css/custom.css";
import React from "react";
import { useGlobalContext } from "./context";
import PlayMainPage from "./pages/PlayMainPage";
import SingleConfigPage from "./pages/SingleConfigPage";
import SingleResultsPage from "./pages/SingleResultsPage";
import SinglePlayPage from "./pages/SinglePlayPage";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const {
    dispatch,
    state: { user, loading },
  } = useGlobalContext();
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
          <Route exact path={"/login"}>
            {user && !loading ? <Redirect to="/" /> : <LoginPage />}
          </Route>
          <Route path="/register" exact component={RegisterPage} />
          <QuestionsContext>
            <PrivateRoute path="/play" exact component={PlayMainPage} />
            <Route path="/single-play" exact component={SinglePlayPage} />
            <Route path="/single-config" exact component={SingleConfigPage} />
            <Route path="/single-results" exact component={SingleResultsPage} />
          </QuestionsContext>
        </Switch>
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
