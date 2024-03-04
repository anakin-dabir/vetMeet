import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AppState from "./context/appState/AppState";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <React.StrictMode>
    <AppState>
      <BrowserRouter>
        <Provider store={store}>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={1500}
          >
            <App />
          </SnackbarProvider>
        </Provider>
      </BrowserRouter>
    </AppState>
  </React.StrictMode>,
  document.getElementById("root")
);
