import React from 'react';
import ReactDOM from 'react-dom'
import App from './components/app';
import { Provider } from 'react-redux'
import store from './store/store'

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    app
)