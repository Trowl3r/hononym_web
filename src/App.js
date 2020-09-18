import React, { Fragment, useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

//redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setToken from "./utils/setToken";
import { makeStyles } from "@material-ui/core/styles";

//Components
import Routes from "./compontents/routing/Routes";
import NavBar from "./compontents/layout/NavBar";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme =
  localStorage.getItem("theme") === "light" ||
  localStorage.getItem("theme") === null
    ? createMuiTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          secondary: {
            main: "#9E9E9E",
          }
        },
      })
    : createMuiTheme({
        palette: {
          type: "dark",
          primary: {
            main: "#242526",
          },
          secondary: {
            main: "#9E9E9E"
          }
        },
      });

const useStyles = makeStyles((theme) => ({
  align: {
    margin: "7%",
  },
}));

const App = () => {
  const classes = useStyles();
  useEffect(() => {
    setToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Fragment>
          <NavBar />
          <Switch>
            <div className={classes.align}>
              <Route component={Routes} />
            </div>
          </Switch>
        </Fragment>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
