import { createStore, applyMiddleware, compose } from "redux";
import Thunk from "redux-thunk";
import reducers from "./store";

const enhancedCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () =>
    createStore(reducers, enhancedCompose(applyMiddleware(Thunk)));

export default configureStore;
