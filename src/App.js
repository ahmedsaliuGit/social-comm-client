import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
import themeFile from "./utils/theme";
// MUI modules
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
// import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";
// Pages
import home from "./pages/home";
import signup from "./pages/signup";
import login from "./pages/login";
import user from "./pages/user";

// Redux imports
import { Provider } from "react-redux";
import store from "./redux/store";
import { getUserData, logoutUser } from "./redux/actions/userActions";
import { SET_AUTHENTICATED } from "./redux/types";

// Component
import Navbar from "./components/layout/Navbar";
import AuthRoute from "./utils/AuthRoute";
import axios from "axios";

axios.defaults.baseURL =
  "https://us-central1-social-comm.cloudfunctions.net/api";

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />

            <div className="app-container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/signup" component={signup} />
                <AuthRoute exact path="/login" component={login} />
                <Route exact path="/users/:handle" component={user} />
                <Route
                  exact
                  path="/users/:handle/scream/:screamId"
                  component={user}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
