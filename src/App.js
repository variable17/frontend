import Login from "./pages/login";
import Home from "./pages/home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import UserContextProvider from "./contexts/userContext";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <UserContextProvider>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
          </UserContextProvider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
