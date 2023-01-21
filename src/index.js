import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import reducers from './reducers';
import middleware from './middleware';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(reducers, middleware);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
