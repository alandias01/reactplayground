import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./reducers/index";
import mySaga from "./sagas/index";

export default function configureStore(preloadedState: any) {
  const reduxDevTools =
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__();

  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composeEnhancers = compose(enhancers[0], reduxDevTools);

  const store = createStore(rootReducer, preloadedState, composeEnhancers);

  sagaMiddleware.run(mySaga);

  return store;
}
