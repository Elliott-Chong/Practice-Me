import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Switch, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import "./css/custom.css";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
      </Switch>
    </>
  );
}

export default App;
