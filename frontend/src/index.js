import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AppState from './context/appState/AppState';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack';



ReactDOM.render(
  <React.StrictMode>
    <AppState>
      <BrowserRouter>


        <Provider store={store}>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1500}>


            <App />


          </SnackbarProvider>
          
        </Provider>

      </BrowserRouter>
    </AppState>
  </React.StrictMode>,
  document.getElementById( 'root' )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
