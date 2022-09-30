import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
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
import MultiPlay from "./pages/MultiPlay";
import MultiConfigPage from "./pages/MultiConfigPage";
import MultiResultsPage from "./pages/MultiResultsPage";
import MultiJoinPage from "./pages/MultiJoinPage";

function App() {
  const location = useLocation();
  const {
    dispatch,
    loadUser,
    state: { user, loading },
  } = useGlobalContext();
  React.useEffect(() => {
    const navHeight = document
      .querySelector("nav")
      .getBoundingClientRect().height;
    document.getElementById("main-container").style.paddingTop =
      navHeight + "px";
    dispatch({ type: "SET_NAV_HEIGHT", payload: navHeight });
    loadUser();
  }, [dispatch, location, loadUser]);
  return (
    <>
      <Navbar />
      <main id="main-container" className="bg-gray-800">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route exact path={"/login"}>
            {user && !loading ? <Redirect to="/" /> : <LoginPage />}
          </Route>
          <Route exact path={"/register"}>
            {user && !loading ? <Redirect to="/" /> : <RegisterPage />}
          </Route>
          <QuestionsContext>
            <PrivateRoute path="/play" exact component={PlayMainPage} />
            {/* single player */}
            <PrivateRoute
              path="/single-play"
              exact
              component={SinglePlayPage}
            />
            <PrivateRoute
              path="/single-config"
              exact
              component={SingleConfigPage}
            />
            <PrivateRoute
              path="/single-results"
              exact
              component={SingleResultsPage}
            />
            {/* multiplayer */}
            <PrivateRoute path="/multi-play/:id" exact component={MultiPlay} />
            <PrivateRoute path="/multi-join" exact component={MultiJoinPage} />
            <PrivateRoute
              path="/multi-config"
              exact
              component={MultiConfigPage}
            />
            <PrivateRoute
              path="/multi-result/:id"
              exact
              component={MultiResultsPage}
            />

            {/* 404 route */}
            {/* <Route
              exact
              path="*"
              component={() => (
                <>
                  <h1>PAGE NOT FOUND</h1>
                </>
              )}
            /> */}
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
