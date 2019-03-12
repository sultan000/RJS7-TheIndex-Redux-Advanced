import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import App from "./App";

import thunk from "redux-thunk";
import { Provider } from "react-redux";
import authorsReducer from "./store/reducers/authors";
import authorReducer from "./store/reducers/author";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";

const rootReducer = combineReducers({
  rootAuthors: authorsReducer,
  rootAuthor: authorReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
