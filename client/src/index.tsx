import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import './containers/firebase/config';

// REDUX
import { Provider } from 'react-redux';
import store from './app/store';

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
