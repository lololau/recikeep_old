// Dependencies
import * as React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
// Store
import store from './app/store';
// Component
import App from './App';
// Authentication
import './app/config';
// Translation
import './i18n';
// Style
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    // eslint-disable-next-line prettier/prettier
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
