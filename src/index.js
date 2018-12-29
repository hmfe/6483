import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';

import reducer from './reducers';
import App from './containers/App';
import './index.scss';

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));

render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
