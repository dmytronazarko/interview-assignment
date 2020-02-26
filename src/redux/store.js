import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import rootReducer from './index';
import {Fetch} from '../utils';

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(Fetch), promise)),
);

export default store;
