import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import ReactDOM from "react-dom";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import { Provider } from "react-redux";
import DogetherApp from "./components/DogetherApp";
import configureStore from "./store/configureStore";
import { saveState, loadState } from './localStorage';

const store = configureStore();

store.subscribe(() => {
  saveState({
    projects: store.getState().projects,
    boards: store.getState().boards,
    tasks: store.getState().tasks
  });
});

const jsx = (
  <Provider store={store}>
    <DogetherApp />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
