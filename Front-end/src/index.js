import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { IntlProvider } from 'react-intl';
import enUS from './locales/en-US'; 
import zhCN from './locales/zh-CN'; 


const locale = 'en-US'; 

const messages = locale === 'en-US' ? enUS : zhCN;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <IntlProvider locale={locale} messages={messages}>
          <App />
        </IntlProvider>
      </SnackbarProvider>
    </Provider>
  // </React.StrictMode>
);


reportWebVitals();
