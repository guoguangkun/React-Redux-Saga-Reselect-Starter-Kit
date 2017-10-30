import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import { browserHistory } from 'react-router'
import makeRootReducer from '../reducers'
import {updateLocation} from '../reducers/location';
const sagaMiddleware = createSagaMiddleware();


const createStore = (initialState = {}) => {
  const crashReporter = store => next => action => {
    try {
      return next(action)
    } catch (err) {
      console.error('Caught an exception!', err)
      !__DEV__ && Raven && Raven.captureException(err, {
        extra: {
          action,
          state: store.getState()
        }
      });
      throw err
    }
  }
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [sagaMiddleware, crashReporter];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  let composeEnhancers = compose

  if (__DEV__) {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createReduxStore(
    makeRootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  sagaMiddleware.run(rootSaga);
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const redus = require('../reducers').default
      store.replaceReducer(redus)
    })
  }

  return store
}

export default createStore
